import React, { useState } from 'react';
import { TouchableHighlight, useWindowDimensions, View } from 'react-native';
import {
  CategoryIsShortlisted,
  CategoryType,
  ContenderAccolade,
  EventStatus,
  PredictionType,
} from '../../../API';
import { getCategorySlots } from '../../../constants/categories';
import COLORS from '../../../constants/colors';
import theme from '../../../constants/theme';
import { useCategory } from '../../../context/CategoryContext';
import { iCachedTmdbMovie, iCachedTmdbPerson } from '../../../services/cache/types';
import TmdbServices from '../../../services/tmdb';
import { iCategory, iEvent } from '../../../types';
import useDevice from '../../../util/device';
import { getNumPredicting } from '../../../util/getNumPredicting';
import { useAsyncEffect } from '../../../util/hooks';
import { IconButton } from '../../Buttons/IconButton';
import { Body, SubHeader } from '../../Text';
import AccoladeTag from './AccoladeTag';
import { iContenderListItemProps } from './ContenderListItem';

const ContenderListItemCondensed = (props: iContenderListItemProps) => {
  const {
    variant,
    prediction,
    ranking,
    draggable,
    highlighted,
    categoryType,
    onPressItem,
    isAuthProfile,
    disableEditing: _disableEditing,
  } = props;
  const { isActive, drag } = draggable || {};
  const { width: windowWidth } = useWindowDimensions();
  const { isPad } = useDevice();

  const RIGHT_COL_WIDTH = windowWidth / 3;

  const { category: _category, event: _event, date } = useCategory();
  const isHistory = !!date;
  const disableEditing = _disableEditing || isHistory || !isAuthProfile;
  const category = _category as iCategory;
  const event = _event as iEvent;

  const itemHeight = 25 * (isPad ? 1.2 : 1);

  const [tmdbMovie, setTmdbMovie] = useState<iCachedTmdbMovie | undefined>();
  const [tmdbPerson, setTmdbPerson] = useState<iCachedTmdbPerson | undefined>();

  const tmdbMovieId = prediction.contenderMovie?.tmdbId;
  const tmdbPersonId = prediction.contenderPerson?.tmdbId;

  const eventIsArchived = event.status === EventStatus.ARCHIVED;

  useAsyncEffect(async () => {
    if (tmdbPersonId) {
      // get tmdb person info
      const { data: personData, status: personStatus } = await TmdbServices.getTmdbPerson(
        tmdbPersonId,
      );
      if (personStatus === 'success') {
        setTmdbPerson(personData);
      }
    }
    if (tmdbMovieId) {
      // get movie tmdb info
      const { data, status } = await TmdbServices.getTmdbMovie(tmdbMovieId);
      if (status === 'success') {
        setTmdbMovie(data);
      }
    }
  }, [tmdbMovieId]);

  const categoryName = category.name;
  const catInfo = tmdbMovie?.categoryInfo?.[categoryName];
  const categoryInfo = catInfo ? catInfo?.join(', ') : undefined;
  const indexedRankings =
    variant === 'community' ? prediction.indexedRankings : undefined;

  let title = '';
  let subtitle = '';
  switch (categoryType) {
    case CategoryType.FILM:
      title = tmdbMovie?.title || '';
      subtitle = categoryInfo || '';
      break;
    case CategoryType.PERFORMANCE:
      if (!tmdbPerson) break;
      title = tmdbPerson?.name || '';
      subtitle = tmdbMovie?.title || '';
      break;
    case CategoryType.SONG:
      title = prediction.contenderSong?.title || '';
      subtitle = tmdbMovie?.title || '';
      break;
  }

  const { win, nom } = getNumPredicting(
    indexedRankings || {},
    getCategorySlots(event, category.name, prediction.predictionType),
  );

  const nominationsHaveHappened = prediction.predictionType === PredictionType.WIN;

  const predictionIsNotNominated =
    ['personal', 'selectable'].includes(variant) &&
    nominationsHaveHappened &&
    prediction.accolade !== ContenderAccolade.NOMINEE &&
    prediction.accolade !== ContenderAccolade.WINNER;

  const predictionIsNotShortlisted =
    ['personal', 'selectable'].includes(variant) &&
    category.isShortlisted === CategoryIsShortlisted.TRUE &&
    !prediction.accolade;

  const isUnqualified =
    !eventIsArchived && (predictionIsNotNominated || predictionIsNotShortlisted);

  return (
    <TouchableHighlight
      onPress={() => {
        onPressItem(prediction);
      }}
      style={{
        backgroundColor: isActive
          ? COLORS.secondaryDark
          : isUnqualified && (variant !== 'selectable' || highlighted)
          ? COLORS.error
          : highlighted
          ? COLORS.secondaryDark
          : 'transparent',
        width: '100%',
        paddingTop: theme.windowMargin / 4,
        paddingBottom: theme.windowMargin / 4,
        flexDirection: 'row',
        paddingLeft: theme.windowMargin,
      }}
      underlayColor={draggable ? COLORS.secondaryDark : 'transparent'}
      onLongPress={disableEditing ? undefined : drag}
      disabled={isActive}
    >
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <SubHeader style={{ width: isPad ? 50 : 30 }}>
            {ranking.toString() + '.'}
          </SubHeader>
          <View
            style={{
              flex: 1,
              overflow: 'hidden',
              height: itemHeight,
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 10,
            }}
          >
            <SubHeader style={{ marginLeft: 10, marginRight: 5 }}>{title}</SubHeader>
            {subtitle && subtitle !== '' ? <Body>{'• ' + subtitle}</Body> : null}
            {isHistory && prediction.accolade ? (
              <AccoladeTag
                accolade={prediction.accolade}
                type={prediction.predictionType}
              />
            ) : null}
          </View>
          {indexedRankings ? (
            <View style={{ flexDirection: 'row', paddingRight: theme.windowMargin }}>
              {nominationsHaveHappened ? (
                <View />
              ) : (
                <View style={{ width: RIGHT_COL_WIDTH / 2.8 }}>
                  <Body style={{ textAlign: 'right' }}>{nom.toString()}</Body>
                </View>
              )}
              <View style={{ width: RIGHT_COL_WIDTH / 2.2 }}>
                <Body style={{ textAlign: 'right' }}>{win.toString()}</Body>
              </View>
            </View>
          ) : null}
          {variant === 'personal' && !disableEditing ? (
            <View
              style={{
                height: itemHeight,
                justifyContent: 'center',
                marginRight: 13,
              }}
            >
              <IconButton
                iconProps={{ name: 'menu', size: 24 }}
                color={COLORS.white}
                enableOnPressIn
                onPress={drag || (() => {})}
                styles={{
                  height: 24,
                  width: 40,
                  justifyContent: 'center',
                  marginRight: 13,
                  alignSelf: 'center',
                  alignItems: 'center',
                }}
              />
            </View>
          ) : null}
        </View>
      </>
    </TouchableHighlight>
  );
};

export default ContenderListItemCondensed;
