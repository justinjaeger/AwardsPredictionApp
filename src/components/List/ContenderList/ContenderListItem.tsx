import React, { useState } from 'react';
import { TouchableHighlight } from 'react-native';
import COLORS from '../../../constants/colors';
import { Category, CategoryType, Contender, Movie } from '../../../models';
import DS from '../../../services/datastore';
import { useAsyncEffect } from '../../../util/hooks';
import FilmListItem from './FilmListItem';
import PerformanceListItem from './PerformanceListItem';
import SongListItem from './SongListItem';

type iContenderListItemProps = {
  category: Category;
  contender: Contender;
  ranking: number;
  selected?: boolean;
  isSelectable?: boolean;
  disabled?: boolean;
  onPressThumbnail?: (c: Contender) => Promise<void>;
  onPressItem?: (c: Contender) => Promise<void>;
};

const ContenderListItem = (props: iContenderListItemProps) => {
  const {
    category,
    contender,
    ranking,
    selected: _selected,
    isSelectable,
    disabled,
    onPressThumbnail,
    onPressItem,
  } = props;

  const [selected, setSelected] = useState<boolean>(_selected || false);
  const [movie, setMovie] = useState<Movie | undefined>();

  const onPress = () => {
    if (disabled) return;
    onPressThumbnail && onPressThumbnail(contender);
  };

  useAsyncEffect(async () => {
    const movieId = contender.contenderMovieId;
    const { data: movie } = await DS.getMovieById(movieId);
    setMovie(movie);
  }, [movie]);

  if (!movie) return null;

  let component: JSX.Element = <></>;
  switch (CategoryType[category.type]) {
    case CategoryType.FILM:
      component = (
        <FilmListItem
          category={category}
          movie={movie}
          ranking={ranking}
          onPress={onPress}
        />
      );
      break;
    case CategoryType.PERFORMANCE:
      component = (
        <PerformanceListItem contender={contender} ranking={ranking} onPress={onPress} />
      );
      break;
    case CategoryType.SONG:
      if (!contender.contenderSongId) return null;
      component = (
        <SongListItem
          tmdbMovieId={movie?.tmdbId}
          songId={contender.contenderSongId}
          ranking={ranking}
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
        onPressItem && onPressItem(contender);
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
