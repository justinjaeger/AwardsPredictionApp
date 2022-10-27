import React, { useState } from 'react';
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
  draggable?: {
    isActive: boolean;
    drag: () => void;
  };
  onPressThumbnail?: (contenderId: string) => void;
  onPressItem?: (contenderId: string) => void;
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
    onPressThumbnail,
    onPressItem,
  } = props;
  const { isActive, drag } = draggable || {};
  const { category } = useCategory();

  const [selected, setSelected] = useState<boolean>(initiallySelected);

  const contenderId = prediction?.contenderId;
  const categoryType = category?.getCategory?.type;
  const categoryName = category?.getCategory?.name;
  const movieId = prediction?.contenderMovie?.id;
  const contenderPersonId = prediction?.contenderPerson?.id;
  const songId = prediction?.contenderSongId;
  const tmdbMovieId = prediction?.contenderMovie?.tmdbId;
  const movieStudio = prediction?.contenderMovie?.studio;

  const onPress = () => {
    if (disabled) return;
    onPressThumbnail && onPressThumbnail(contenderId);
  };

  if (!categoryType || !tmdbMovieId || !categoryName) {
    return <></>;
  }

  const _size = size || PosterSize.SMALL;

  let component: JSX.Element = <></>;
  switch (CategoryType[categoryType]) {
    case CategoryType.FILM:
      if (!movieId) return null;
      component = (
        <FilmListItem
          contenderId={contenderId}
          categoryName={categoryName}
          movieTmdbId={tmdbMovieId}
          movieStudio={movieStudio || undefined}
          ranking={ranking}
          size={_size}
          onPress={onPress}
        />
      );
      break;
    case CategoryType.PERFORMANCE:
      if (!contenderPersonId) break;
      component = (
        <PerformanceListItem
          contenderPersonId={contenderPersonId}
          contenderMovieId={movieId || ''}
          ranking={ranking}
          size={_size}
          onPress={onPress}
        />
      );
      break;
    case CategoryType.SONG:
      if (!songId || !tmdbMovieId) return null;
      component = (
        <SongListItem
          tmdbMovieId={tmdbMovieId}
          songId={songId}
          ranking={ranking}
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
        onPressItem && onPressItem(contenderId);
      }}
      style={{
        backgroundColor: selected ? COLORS.success : 'transparent',
        width: '100%',
        height: _size,
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
