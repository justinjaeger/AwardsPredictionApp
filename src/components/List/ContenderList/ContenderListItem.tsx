import React, { useState } from 'react';
import { TouchableHighlight } from 'react-native';
import { GetCategoryQuery, GetContenderQuery, GetMovieQuery } from '../../../API';
import COLORS from '../../../constants/colors';
import { PosterSize } from '../../../constants/posterDimensions';
import { CategoryType } from '../../../models';
import ApiServices from '../../../services/graphql';
import { useAsyncEffect } from '../../../util/hooks';
import FilmListItem from './FilmListItem';
import PerformanceListItem from './PerformanceListItem';
import SongListItem from './SongListItem';

type iContenderListItemProps = {
  categoryId: string;
  contenderId: string;
  ranking: number;
  selected?: boolean;
  isSelectable?: boolean;
  disabled?: boolean;
  size?: PosterSize;
  onPressThumbnail?: (contenderId: string) => void;
  onPressItem?: (contenderId: string) => void;
};

const ContenderListItem = (props: iContenderListItemProps) => {
  const {
    categoryId,
    contenderId,
    ranking,
    size,
    selected: _selected,
    isSelectable,
    disabled,
    onPressThumbnail,
    onPressItem,
  } = props;

  const [selected, setSelected] = useState<boolean>(_selected || false);
  const [movie, setMovie] = useState<GetMovieQuery>();
  const [category, setCategory] = useState<GetCategoryQuery>();
  const [contender, setContender] = useState<GetContenderQuery>();

  const movieId = contender?.getContender?.contenderMovieId;
  const categoryType = category?.getCategory?.type;
  const songId = contender?.getContender?.contenderSongId;
  const tmdbMovieId = movie?.getMovie?.tmdbId;

  // NOTE: later, we'll just have the category live in context instead of fetching every new component / passing via nav props
  useAsyncEffect(async () => {
    const { data } = await ApiServices.getCategoryById(categoryId);
    setCategory(data);
  }, [categoryId]);

  // NOTE: later, we'll just have the contender live in context instead of fetching every new component / passing via nav props
  useAsyncEffect(async () => {
    const { data } = await ApiServices.getContenderById(contenderId);
    setContender(data);
  }, [contenderId]);

  const onPress = () => {
    if (disabled) return;
    onPressThumbnail && onPressThumbnail(contenderId);
  };

  useAsyncEffect(async () => {
    if (!movieId) return;
    const { data: movie } = await ApiServices.getMovie(movieId);
    setMovie(movie);
  }, [movieId]);

  if (!movie || !categoryType) return null;

  let component: JSX.Element = <></>;
  switch (CategoryType[categoryType]) {
    case CategoryType.FILM:
      if (!movieId) return null;
      component = (
        <FilmListItem
          contenderId={contenderId}
          categoryId={categoryId}
          movieId={movieId}
          ranking={ranking}
          size={size}
          onPress={onPress}
        />
      );
      break;
    case CategoryType.PERFORMANCE:
      component = (
        <PerformanceListItem
          contenderId={contenderId}
          ranking={ranking}
          size={size}
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
          size={size}
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
      }}
      underlayColor={onPressItem ? COLORS.border : 'transparent'}
    >
      {component}
    </TouchableHighlight>
  );
};

export default ContenderListItem;
