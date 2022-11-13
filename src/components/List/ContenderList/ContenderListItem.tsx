import React, { useEffect, useState } from 'react';
import { TouchableHighlight } from 'react-native';
import { CategoryType } from '../../../API';
import COLORS from '../../../constants/colors';
import { PosterSize } from '../../../constants/posterDimensions';
import { useCategory } from '../../../context/CategoryContext';
import { iPrediction } from '../../../context/PredictionContext';
import FilmListItem from './FilmListItem';
import PerformanceListItem from './PerformanceListItem';
import SongListItem from './SongListItem';

type iContenderListItemProps = {
  prediction: iPrediction;
  ranking: number;
  selected: boolean;
  isSelectable?: boolean;
  disabled?: boolean;
  size?: PosterSize;
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
    size,
    selected: initiallySelected,
    isSelectable,
    disabled,
    draggable,
    posterWidth,
    onPressThumbnail,
    onPressItem,
  } = props;
  const { isActive, drag } = draggable || {};
  const { category } = useCategory();

  const [selected, setSelected] = useState<boolean>(initiallySelected);

  useEffect(() => {
    setSelected(initiallySelected);
  }, [initiallySelected]);

  if (!category) return null;

  const tmdbMovieId = prediction.contenderMovie?.tmdbId;
  const tmdbPersonId = prediction.contenderPerson?.tmdbId;
  const movieStudio = prediction.contenderMovie?.studio;

  const onPress = () => {
    if (disabled) return;
    onPressThumbnail && onPressThumbnail(prediction.contenderId);
  };

  if (!tmdbMovieId) {
    return null;
  }

  const _size = size || PosterSize.SMALL;

  let component: JSX.Element = <></>;
  switch (CategoryType[category.type]) {
    case CategoryType.FILM:
      component = (
        <FilmListItem
          communityRankings={prediction.communityRankings}
          categoryName={category.name}
          tmdbMovieId={tmdbMovieId}
          movieStudio={movieStudio || undefined}
          ranking={ranking}
          width={posterWidth}
          size={_size}
          onPress={onPress}
        />
      );
      break;
    case CategoryType.PERFORMANCE:
      if (!tmdbPersonId) break;
      component = (
        <PerformanceListItem
          tmdbPersonId={tmdbPersonId}
          tmdbMovieId={tmdbMovieId}
          ranking={ranking}
          width={posterWidth}
          size={_size}
          onPress={onPress}
        />
      );
      break;
    case CategoryType.SONG:
      component = (
        <SongListItem
          tmdbMovieId={tmdbMovieId}
          artist={prediction.contenderSong?.artist || ''}
          title={prediction.contenderSong?.title || ''}
          ranking={ranking}
          width={posterWidth}
          size={_size}
          onPress={onPress}
        />
      );
      break;
  }

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
      {component}
    </TouchableHighlight>
  );
};

export default ContenderListItem;
