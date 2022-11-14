import React, { useEffect, useState } from 'react';
import { TouchableHighlight, View } from 'react-native';
import { CategoryName, CategoryType } from '../../../API';
import COLORS from '../../../constants/colors';
import { PosterSize } from '../../../constants/posterDimensions';
import theme from '../../../constants/theme';
import { useCategory } from '../../../context/CategoryContext';
import { iPrediction } from '../../../context/PredictionContext';
import { iCachedTmdbMovie, iCachedTmdbPerson } from '../../../services/cache/types';
import TmdbServices from '../../../services/tmdb';
import { iCategory } from '../../../store/types';
import { useAsyncEffect } from '../../../util/hooks';
import Poster from '../../Images/Poster';
import { BodyLarge, Label } from '../../Text';

type iContenderListItemProps = {
  prediction: iPrediction;
  ranking: number;
  selected: boolean;
  isSelectable?: boolean;
  disabled?: boolean;
  posterWidth?: number;
  draggable?: {
    isActive: boolean;
    drag: () => void;
  };
  onPressThumbnail?: (contenderId: string, personTmdbId?: number) => void;
  onPressItem?: (prediction: iPrediction) => void;
};

const ContenderListItem = (props: iContenderListItemProps) => {
  const {
    prediction,
    ranking,
    selected: initiallySelected,
    isSelectable,
    disabled,
    draggable,
    posterWidth,
    onPressThumbnail,
    onPressItem,
  } = props;
  const { isActive, drag } = draggable || {};
  const { category: _category } = useCategory();

  const category = _category as iCategory;

  const [selected, setSelected] = useState<boolean>(initiallySelected);
  const [tmdbMovie, setTmdbMovie] = useState<iCachedTmdbMovie | undefined>();
  const [tmdbPerson, setTmdbPerson] = useState<iCachedTmdbPerson | undefined>();

  const tmdbMovieId = prediction.contenderMovie?.tmdbId;
  const tmdbPersonId = prediction.contenderPerson?.tmdbId;
  const movieStudio = prediction.contenderMovie?.studio;

  useAsyncEffect(async () => {
    if (!tmdbMovieId) {
      console.error('No tmdbMovieId !!');
      return;
    }
    // get tmdb person info
    if (tmdbPersonId) {
      const { data: personData, status: personStatus } = await TmdbServices.getTmdbPerson(
        tmdbPersonId,
      );
      if (personStatus === 'success') {
        setTmdbPerson(personData);
      }
      const { status, data } = await TmdbServices.getTmdbMovie(tmdbMovieId);
      if (status === 'success') {
        setTmdbMovie(data);
      }
    }
    // get movie tmdb info
    const { data, status } = await TmdbServices.getTmdbMovie(tmdbMovieId);
    if (status === 'success') {
      setTmdbMovie(data);
    }
  }, [tmdbMovieId]);

  useEffect(() => {
    setSelected(initiallySelected);
  }, [initiallySelected]);

  const onPress = () => {
    if (disabled) return;
    onPressThumbnail && onPressThumbnail(prediction.contenderId);
  };

  if (!tmdbMovieId) {
    return null;
  }

  let title = '';
  let subtitle = '';
  switch (CategoryType[category.type]) {
    case CategoryType.FILM:
      title = tmdbMovie?.title || '';
      subtitle = movieStudio || '';
      break;
    case CategoryType.PERFORMANCE:
      if (!tmdbPerson) break;
      title = tmdbPerson?.name || '';
      subtitle = tmdbMovie?.title || '';
      break;
    case CategoryType.SONG:
      title =
        (prediction.contenderSong?.title || '') +
        ', ' +
        (prediction.contenderSong?.artist || '');
      subtitle = tmdbMovie?.title || '';
      break;
  }

  const categoryName = CategoryName[category.name];
  const categoryInfo = tmdbMovie?.categoryInfo?.[categoryName];
  const communityRankings = prediction.communityRankings;

  const size = posterWidth || PosterSize.SMALL;

  return (
    <TouchableHighlight
      onPress={() => {
        if (disabled) return;
        if (isSelectable) {
          setSelected(!selected);
        }
        onPressItem && onPressItem(prediction);
      }}
      style={{
        backgroundColor: selected ? COLORS.success : 'transparent',
        width: '100%',
      }}
      underlayColor={onPressItem ? COLORS.border : 'transparent'}
      onLongPress={drag}
      disabled={isActive}
    >
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginLeft: theme.windowMargin,
        }}
      >
        <Poster
          path={tmdbMovie?.posterPath || null}
          title={tmdbMovie?.title || ''}
          width={size}
          ranking={ranking}
          onPress={onPress}
        />
        <View style={{ flexDirection: 'column' }}>
          <BodyLarge style={{ marginLeft: 10 }}>{title}</BodyLarge>
          <Label style={{ marginTop: 1, marginLeft: 10 }}>{subtitle}</Label>
          {categoryInfo ? (
            <Label style={{ marginLeft: 10 }}>{categoryInfo.join(', ')}</Label>
          ) : null}
          {communityRankings && size >= PosterSize.SMALL ? (
            <>
              <Label
                style={{ marginLeft: 10 }}
              >{`pred win: ${communityRankings.predictingWin}`}</Label>
              <Label
                style={{ marginLeft: 10 }}
              >{`pred nom: ${communityRankings.predictingNom}`}</Label>
              <Label
                style={{ marginLeft: 10 }}
              >{`pred unranked: ${communityRankings.predictingUnranked}`}</Label>
            </>
          ) : null}
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ContenderListItem;
