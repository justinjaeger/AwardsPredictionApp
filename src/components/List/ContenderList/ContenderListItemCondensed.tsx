/* eslint-disable sonarjs/no-duplicate-string */
import React, { useState } from 'react';
import { TouchableHighlight, useWindowDimensions, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CategoryType } from '../../../API';
import { getCategorySlots } from '../../../constants/categories';
import COLORS from '../../../constants/colors';
import theme from '../../../constants/theme';
import { useCategory } from '../../../context/CategoryContext';
import { iCachedTmdbMovie, iCachedTmdbPerson } from '../../../services/cache/types';
import TmdbServices from '../../../services/tmdb';
import { iCategory, iEvent, iPrediction } from '../../../types';
import { getNumPredicting } from '../../../util/getNumPredicting';
import { useAsyncEffect } from '../../../util/hooks';
import CustomIcon from '../../CustomIcon';
import { Body, SubHeader } from '../../Text';

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

  const { category: _category, event: _event } = useCategory();
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

  const communityRankings =
    variant === 'community' ? prediction.communityRankings : undefined;

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
    communityRankings || {},
    getCategorySlots(event.year, event.awardsBody, category.name),
  );

  return (
    <TouchableHighlight
      onPress={() => {
        onPressItem(prediction);
      }}
      style={{
        backgroundColor: isActive || highlighted ? COLORS.secondaryDark : 'transparent',
        width: '100%',
        paddingTop: theme.windowMargin / 4,
        paddingBottom: theme.windowMargin / 4,
        flexDirection: 'row',
        paddingLeft: theme.windowMargin,
      }}
      underlayColor={COLORS.secondaryDark}
      onLongPress={drag}
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
            }}
          >
            <SubHeader style={{ marginLeft: 10 }}>{title}</SubHeader>
          </View>
          {communityRankings ? (
            <View style={{ flexDirection: 'row', paddingRight: theme.windowMargin }}>
              <View
                style={{
                  width: RIGHT_COL_WIDTH / 2,
                }}
              >
                <Body style={{ textAlign: 'right' }}>{nom.toString()}</Body>
              </View>
              <View
                style={{
                  width: RIGHT_COL_WIDTH / 2,
                }}
              >
                <Body style={{ textAlign: 'right' }}>{win.toString()}</Body>
              </View>
            </View>
          ) : null}
          {variant === 'personal' ? (
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
