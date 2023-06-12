import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Keyboard, Linking, TouchableOpacity } from 'react-native';
import { CategoryType } from '../../API';
import COLORS from '../../constants/colors';
import { iPrediction } from '../../types';
import ContenderListItem from '../List/ContenderList/ContenderListItem';
import { BodyBold } from '../Text';

type iMovieListProps = {
  predictions: iPrediction[];
  categoryType: CategoryType; // Don't do SONG though, use SongListSearch
  disablePaddingBottom?: boolean;
  onSelect: (id: number) => void;
};

const MovieListSearch = (props: iMovieListProps) => {
  const { predictions, categoryType, disablePaddingBottom, onSelect } = props;

  const [selectedTmdbId, setSelectedTmdbId] = useState<number | undefined>(undefined);

  // reset whenever list data changes
  useEffect(() => {
    setSelectedTmdbId(undefined);
  }, [predictions.length]);

  const getTmdbId = (prediction: iPrediction) => {
    if (categoryType === CategoryType.PERFORMANCE) {
      return prediction.contenderPerson?.tmdbId || 0;
    } else {
      return prediction.contenderMovie?.tmdbId || 0;
    }
  };

  const onPressItem = (prediction: iPrediction) => {
    Keyboard.dismiss();
    const tmdbId = getTmdbId(prediction);
    if (tmdbId === selectedTmdbId) {
      setSelectedTmdbId(undefined);
    } else {
      setSelectedTmdbId(tmdbId);
    }
    onSelect(getTmdbId(prediction));
  };

  return (
    <FlatList
      data={predictions}
      keyExtractor={(item) => item.contenderId}
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
      renderItem={({ item: prediction, index: i }) => {
        const tmdbId = getTmdbId(prediction);
        const selected = tmdbId === selectedTmdbId;
        return (
          <ContenderListItem
            prediction={prediction}
            ranking={i + 1}
            onPressItem={onPressItem}
            onPressThumbnail={onPressItem}
            isSelected={selected}
            highlighted={selected}
            variant={'search'}
            categoryType={categoryType}
          />
        );
      }}
    />
  );
};

export default MovieListSearch;
