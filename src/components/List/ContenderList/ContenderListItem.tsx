import React, { useState } from 'react';
import { TouchableHighlight } from 'react-native';
import { CategoryType, GetContenderQuery, GetMovieQuery } from '../../../API';
import COLORS from '../../../constants/colors';
import { PosterSize } from '../../../constants/posterDimensions';
import { useCategory } from '../../../context/CategoryContext';
import ApiServices from '../../../services/graphql';
import { useAsyncEffect } from '../../../util/hooks';
import FilmListItem from './FilmListItem';
import PerformanceListItem from './PerformanceListItem';
import SongListItem from './SongListItem';

type iContenderListItemProps = {
  contenderId: string;
  ranking: number;
  selected: boolean;
  isSelectable?: boolean;
  disabled?: boolean;
  size?: PosterSize;
  onPressThumbnail?: (contenderId: string) => void;
  onPressItem?: (contenderId: string) => void;
};

const ContenderListItem = (props: iContenderListItemProps) => {
  const {
    contenderId,
    ranking,
    size,
    selected: initiallySelected,
    isSelectable,
    disabled,
    onPressThumbnail,
    onPressItem,
  } = props;
  const { category } = useCategory();

  const [selected, setSelected] = useState<boolean>(initiallySelected);

  // TODO: this selected COULD be updating with a useEffect with initiallySelected as a dependency

  const [movie, setMovie] = useState<GetMovieQuery>();
  const [contender, setContender] = useState<GetContenderQuery>();

  const categoryType = category?.getCategory?.type;
  const categoryName = category?.getCategory?.name;
  const movieId = contender?.getContender?.contenderMovieId;
  const contenderPersonId = contender?.getContender?.contenderPersonId;
  const contenderMovieId = contender?.getContender?.contenderMovieId;
  const songId = contender?.getContender?.contenderSongId;
  const tmdbMovieId = movie?.getMovie?.tmdbId;
  const movieStudio = movie?.getMovie?.studio;

  //   // NOTE: later, we'll just have the contender live in context instead of fetching every new component / passing via nav props
  useAsyncEffect(async () => {
    const { data } = await ApiServices.getContenderById(contenderId);
    setContender(data);
  }, [contenderId]);

  useAsyncEffect(async () => {
    if (!movieId) return;
    const { data: movie } = await ApiServices.getMovie(movieId);
    setMovie(movie);
  }, [movieId]);

  const onPress = () => {
    if (disabled) return;
    onPressThumbnail && onPressThumbnail(contenderId);
  };

  if (!movie || !categoryType || !tmdbMovieId || !categoryName || !contenderMovieId) {
    return <></>;
  }

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
          size={size}
          onPress={onPress}
        />
      );
      break;
    case CategoryType.PERFORMANCE:
      if (!contenderPersonId) break;
      component = (
        <PerformanceListItem
          contenderPersonId={contenderPersonId}
          contenderMovieId={contenderMovieId}
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
