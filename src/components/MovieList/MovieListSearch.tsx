import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Keyboard, Linking, TouchableOpacity } from 'react-native';
import COLORS from '../../constants/colors';
import { BodyBold } from '../Text';
import { CategoryType } from '../../models';
import { iSearchData } from '../../services/tmdb';
import SearchListItem from '../SearchListItem';

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
      ListFooterComponent={
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              // eslint-disable-next-line prettier/prettier
              'Can\'t find what you\'re looking for?',
              // eslint-disable-next-line prettier/prettier
              'If you\'re sure it\'s not a spelling mistake, tap the link below and search your movie or person.\n\nCopy the id, which is the 6 digits located in the url.\n\nGo back here and paste id in the search bar.',
              [
                {
                  text: 'themoviedb.com',
                  onPress: () => {
                    Linking.openURL('https://www.themoviedb.org/');
                  },
                },
                { text: 'Close', onPress: () => {} },
              ],
            );
          }}
        >
          <BodyBold
            style={{
              color: COLORS.gray,
              alignSelf: 'center',
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            Can't find what you're looking for?
          </BodyBold>
        </TouchableOpacity>
      }
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
