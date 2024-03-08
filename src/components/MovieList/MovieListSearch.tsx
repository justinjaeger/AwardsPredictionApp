import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard } from 'react-native';
import { CategoryType } from '../../models';
import { iSearchData } from '../../services/tmdb';
import SearchListItem from '../SearchListItem';
import CantFindContenderLink from '../CantFindContenderLink';

type iMovieListProps = {
  data: iSearchData[];
  categoryType: CategoryType; // Don't do SONG though, use SongListSearch
  disablePaddingBottom?: boolean;
  onSelect: (id: number) => void;
};

const MovieListSearch = ({
  data,
  categoryType,
  disablePaddingBottom,
  onSelect,
}: iMovieListProps) => {
  const [selectedTmdbId, setSelectedTmdbId] = useState<number | undefined>(undefined);

  // reset whenever list data changes
  useEffect(() => {
    setSelectedTmdbId(undefined);
  }, [data.length]);

  const onPressItem = (item: iSearchData) => {
    Keyboard.dismiss();
    const tmdbId = item.tmdbId;
    if (tmdbId === selectedTmdbId) {
      setSelectedTmdbId(undefined);
    } else {
      setSelectedTmdbId(tmdbId);
    }
    onSelect(item.tmdbId);
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.tmdbId.toString()}
      style={{ width: '100%' }}
      onScroll={() => {
        Keyboard.dismiss();
      }}
      keyboardShouldPersistTaps={'always'}
      contentContainerStyle={{ paddingBottom: disablePaddingBottom ? 0 : 200 }}
      ListFooterComponent={<CantFindContenderLink />}
      renderItem={({ item, index: i }) => {
        const { tmdbId } = item;
        const selected = tmdbId === selectedTmdbId;

        return (
          <SearchListItem
            item={item}
            ranking={i + 1}
            onPressItem={onPressItem}
            onPressThumbnail={onPressItem}
            isSelected={selected}
            type={categoryType}
          />
        );
      }}
    />
  );
};

export default MovieListSearch;
