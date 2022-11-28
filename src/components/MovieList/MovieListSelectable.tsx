import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { useCategory } from '../../context/CategoryContext';
import { iCategory, iPrediction } from '../../store/types';
import { removePredictionFromList } from '../../util/removePredictionFromList';
import ContenderListItem from '../List/ContenderList/ContenderListItem';

type iMovieListProps = {
  predictions: iPrediction[];
  selectedPredictions: iPrediction[]; // for "add predictions"
  setSelectedPredictions: (ps: iPrediction[]) => void; // for "add predictions"
};

const MovieListSelectable = (props: iMovieListProps) => {
  const { predictions, selectedPredictions, setSelectedPredictions } = props;
  const { category: _category } = useCategory();
  const category = _category as iCategory;

  const [selectedContenderId, setSelectedContenderId] = useState<string | undefined>(); // this selection is whether the film is big or not

  const onPressItem = async (prediction: iPrediction) => {
    const selectedContenderIds = selectedPredictions.map((p) => p.contenderId);
    const contenderId = prediction.contenderId;
    const isAlreadySelected = selectedContenderIds.includes(contenderId);
    const newSelected = isAlreadySelected
      ? removePredictionFromList(selectedPredictions, prediction)
      : [...selectedPredictions, prediction];
    setSelectedPredictions(newSelected);
  };

  const onPressThumbnail = (prediction: iPrediction) => {
    const id = prediction.contenderId;
    if (selectedContenderId === id) {
      setSelectedContenderId(undefined);
    } else {
      setSelectedContenderId(id);
    }
  };

  return (
    <FlatList
      data={predictions}
      keyExtractor={(item) => item.contenderId}
      style={{ width: '100%' }}
      renderItem={({ item: prediction, index: i }) => {
        const highlighted = (selectedPredictions || [])
          .map((sp) => sp.contenderId)
          .includes(prediction.contenderId);
        return (
          <ContenderListItem
            prediction={prediction}
            ranking={i + 1}
            onPressItem={onPressItem}
            onPressThumbnail={onPressThumbnail}
            selected={selectedContenderId === prediction.contenderId}
            highlighted={highlighted}
            variant={'selectable'}
            categoryType={category.type}
          />
        );
      }}
    />
  );
};

export default MovieListSelectable;
