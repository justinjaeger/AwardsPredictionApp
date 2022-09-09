import React from 'react';
import { View } from 'react-native';
import COLORS from '../../../constants/colors';
import { Category, CategoryType, Contender } from '../../../models';
import { BodyLarge } from '../../Text';
import FilmListItem from './FilmListItem';
import PerformanceListItem from './PerformanceListItem';
import SongListItem from './SongListItem';

type iContenderListProps = {
  category: Category;
  contenders: Contender[];
  onPressItem: (c: Contender) => Promise<void>;
};

const ContenderList = (props: iContenderListProps) => {
  const { category, contenders, onPressItem } = props;

  return (
    <View
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        backgroundColor: COLORS.lightestGray,
      }}
    >
      {contenders.length === 0 ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BodyLarge>Add films to this list</BodyLarge>
        </View>
      ) : null}
      {contenders.map((c, i) => {
        switch (CategoryType[category.type]) {
          case CategoryType.FILM:
            return (
              <FilmListItem
                category={category}
                movie={c.movie}
                ranking={i + 1}
                onPress={() => onPressItem(c)}
              />
            );
          case CategoryType.PERFORMANCE:
            return (
              <PerformanceListItem
                contender={c}
                ranking={i + 1}
                onPress={() => onPressItem(c)}
              />
            );
          case CategoryType.SONG:
            if (!c.song) return null;
            return (
              <SongListItem
                tmdbMovieId={c.movie.tmdbId}
                song={c.song}
                ranking={i + 1}
                onPress={() => onPressItem(c)}
              />
            );
          default:
            return null;
        }
      })}
    </View>
  );
};

export default ContenderList;
