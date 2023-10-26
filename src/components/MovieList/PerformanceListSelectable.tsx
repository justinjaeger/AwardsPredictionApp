import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard } from 'react-native';
import ContenderListItem from '../List/ContenderList/ContenderListItem';
import { CategoryType, iPrediction } from '../../types/api';
import { useTmdbDataStore } from '../../context/TmdbDataStore';

type iPerformanceListSelectableProps = {
  predictions: iPrediction[];
  disablePaddingBottom?: boolean;
  onSelect: (personTmdbId: number, movieTmdbId: number) => void;
};

const PerformanceListSelectable = ({
  predictions,
  disablePaddingBottom,
  onSelect,
}: iPerformanceListSelectableProps) => {
  const { getTmdbDataFromPrediction } = useTmdbDataStore();
  const [selectedPerformance, setSelectedPerformance] = useState<
    { personTmdbId: number; movieTmdbId: number } | undefined
  >(undefined);

  // reset whenever list data changes
  useEffect(() => {
    setSelectedPerformance(undefined);
  }, [predictions.length]);

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
        const { movie, person } = getTmdbDataFromPrediction(prediction)!;
        const movieTmdbId = movie?.tmdbId;
        const personTmdbId = person?.tmdbId;
        const selected =
          movieTmdbId === selectedPerformance?.movieTmdbId &&
          personTmdbId === selectedPerformance?.personTmdbId;

        const onPressItem = () => {
          Keyboard.dismiss();
          const movieTmdbId = movie.tmdbId;
          const personTmdbId = person!.tmdbId;
          if (!movieTmdbId || !personTmdbId) return;
          if (selected) {
            setSelectedPerformance(undefined);
          } else {
            setSelectedPerformance({ movieTmdbId, personTmdbId });
          }
          onSelect(movieTmdbId, personTmdbId);
        };

        return (
          <ContenderListItem
            prediction={prediction}
            ranking={i + 1}
            onPressItem={onPressItem}
            onPressThumbnail={onPressItem}
            highlighted={selected}
            variant={'search'}
            categoryType={CategoryType.PERFORMANCE}
          />
        );
      }}
    />
  );
};

export default PerformanceListSelectable;
