import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard } from 'react-native';
import { CategoryType } from '../../API';
import { iPrediction } from '../../types';
import ContenderListItem from '../List/ContenderList/ContenderListItem';

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
      renderItem={({ item: prediction, index: i }) => {
        const tmdbId = getTmdbId(prediction);
        const selected = tmdbId === selectedTmdbId;
        return (
          <ContenderListItem
            prediction={prediction}
            ranking={i + 1}
            onPressItem={onPressItem}
            onPressThumbnail={onPressItem}
            selected={selected}
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
