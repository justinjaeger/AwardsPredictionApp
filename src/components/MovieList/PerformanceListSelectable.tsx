import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard } from 'react-native';
import { CategoryType } from '../../API';
import { iPrediction } from '../../types';
import ContenderListItem from '../List/ContenderList/ContenderListItem';

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
  const [selectedPerformance, setSelectedPerformance] = useState<
    { personTmdbId: number; movieTmdbId: number } | undefined
  >(undefined);

  // reset whenever list data changes
  useEffect(() => {
    setSelectedPerformance(undefined);
  }, [predictions.length]);

  const onPressItem = (prediction: iPrediction) => {
    Keyboard.dismiss();
    const movieTmdbId = prediction.contenderMovie?.tmdbId;
    const personTmdbId = prediction.contenderPerson?.tmdbId;
    if (!movieTmdbId || !personTmdbId) return;
    if (
      movieTmdbId === selectedPerformance?.movieTmdbId &&
      personTmdbId === selectedPerformance?.personTmdbId
    ) {
      setSelectedPerformance(undefined);
    } else {
      setSelectedPerformance({ movieTmdbId, personTmdbId });
    }
    onSelect(movieTmdbId, personTmdbId);
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
        const movieTmdbId = prediction?.contenderMovie?.tmdbId;
        const personTmdbId = prediction?.contenderPerson?.tmdbId;
        const selected =
          movieTmdbId === selectedPerformance?.movieTmdbId &&
          personTmdbId === selectedPerformance?.personTmdbId;

        return (
          <ContenderListItem
            prediction={prediction}
            ranking={i + 1}
            onPressItem={onPressItem}
            onPressThumbnail={onPressItem}
            isSelected={false}
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
