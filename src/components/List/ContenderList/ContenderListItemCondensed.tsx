import React, { useState } from 'react';
import { TouchableHighlight, useWindowDimensions, View } from 'react-native';
import {
  CategoryIsShortlisted,
  CategoryType,
  ContenderAccolade,
  PredictionType,
} from '../../../API';
import { getCategorySlots } from '../../../constants/categories';
import COLORS from '../../../constants/colors';
import { eventStatusToPredictionType } from '../../../constants/events';
import theme from '../../../constants/theme';
import { useCategory } from '../../../context/CategoryContext';
import { iCachedTmdbMovie, iCachedTmdbPerson } from '../../../services/cache/types';
import TmdbServices from '../../../services/tmdb';
import { iCategory, iEvent, iPrediction } from '../../../types';
import { getNumPredicting } from '../../../util/getNumPredicting';
import { useAsyncEffect } from '../../../util/hooks';
import CustomIcon from '../../CustomIcon';
import { Body, SubHeader } from '../../Text';
import AccoladeTag from './AccoladeTag';

type iContenderListItemProps = {
  variant: 'community' | 'personal' | 'selectable' | 'search';
  prediction: iPrediction;
  categoryType: CategoryType;
  ranking: number;
  selected: boolean;
  disabled?: boolean;
  highlighted?: boolean;
  posterWidth?: number;
  draggable?: {
    isActive: boolean;
    drag: () => void;
  };
  onPressItem: (prediction: iPrediction) => void;
  onPressThumbnail?: (prediction: iPrediction) => void;
};

const ContenderListItemCondensed = (props: iContenderListItemProps) => {
  const {
    variant,
    prediction,
    ranking,
    draggable,
    highlighted,
    categoryType,
    onPressItem,
  } = props;
  const { isActive, drag } = draggable || {};
  const { width: windowWidth } = useWindowDimensions();

  const RIGHT_COL_WIDTH = windowWidth / 3;

  const { category: _category, event: _event, date } = useCategory();
  const isHistory = !!date;
  const category = _category as iCategory;
  const event = _event as iEvent;

  const itemHeight = 25;

  const [tmdbMovie, setTmdbMovie] = useState<iCachedTmdbMovie | undefined>();
  const [tmdbPerson, setTmdbPerson] = useState<iCachedTmdbPerson | undefined>();

  const tmdbMovieId = prediction.contenderMovie?.tmdbId;
  const tmdbPersonId = prediction.contenderPerson?.tmdbId;

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

  const indexedRankings =
    variant === 'community' ? prediction.indexedRankings : undefined;

  let title = '';
  switch (categoryType) {
    case CategoryType.FILM:
      title = tmdbMovie?.title || '';
      break;
    case CategoryType.PERFORMANCE:
      if (!tmdbPerson) break;
      title = tmdbPerson?.name || '';
      break;
    case CategoryType.SONG:
      title = prediction.contenderSong?.title || '';
      break;
  }

  const { win, nom } = getNumPredicting(
    indexedRankings || {},
    getCategorySlots(event, category.name) || 0,
  );

  const nominationsHaveHappened =
    eventStatusToPredictionType(event.status) === PredictionType.WIN;

  const predictionIsNotNominated =
    ['personal', 'selectable'].includes(variant) &&
    nominationsHaveHappened &&
    prediction.accolade !== ContenderAccolade.NOMINEE &&
    prediction.accolade !== ContenderAccolade.WINNER;

  const predictionIsNotShortlisted =
    ['personal', 'selectable'].includes(variant) &&
    category.isShortlisted === CategoryIsShortlisted.TRUE &&
    !prediction.accolade;

  const isUnqualified = predictionIsNotNominated || predictionIsNotShortlisted;

  return (
    <TouchableHighlight
      onPress={() => {
        onPressItem(prediction);
      }}
      style={{
        backgroundColor:
          isUnqualified && (variant !== 'selectable' || highlighted)
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
      onLongPress={isHistory ? undefined : drag}
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
          <SubHeader style={{ width: 30 }}>{ranking.toString() + '.'}</SubHeader>
          <View
            style={{
              flex: 1,
              overflow: 'hidden',
              height: itemHeight,
              flexDirection: 'row',
            }}
          >
            <SubHeader style={{ marginLeft: 10, marginRight: 5 }}>{title}</SubHeader>
            {isHistory && prediction.accolade ? (
              <AccoladeTag accolade={prediction.accolade} eventStatus={event.status} />
            ) : null}
          </View>
          {indexedRankings ? (
            <View style={{ flexDirection: 'row', paddingRight: theme.windowMargin }}>
              {nominationsHaveHappened ? (
                <View />
              ) : (
                <View
                  style={{
                    width: RIGHT_COL_WIDTH / 2,
                  }}
                >
                  <Body style={{ textAlign: 'right' }}>{nom.toString()}</Body>
                </View>
              )}
              <View
                style={{
                  width: RIGHT_COL_WIDTH / 2,
                }}
              >
                <Body style={{ textAlign: 'right' }}>{win.toString()}</Body>
              </View>
            </View>
          ) : null}
          {variant === 'personal' && !isHistory ? (
            <View
              style={{
                height: itemHeight,
                justifyContent: 'center',
                marginRight: 13,
              }}
            >
              <CustomIcon name={'menu'} color={COLORS.white} size={24} />
            </View>
          ) : null}
        </View>
      </>
    </TouchableHighlight>
  );
};

export default ContenderListItemCondensed;
