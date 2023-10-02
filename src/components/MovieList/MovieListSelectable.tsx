import React, { useState } from 'react';
import { FlatList, Keyboard } from 'react-native';
import { useEvent } from '../../context/EventContext';
import { removePredictionFromList } from '../../util/removePredictionFromList';
import ContenderListItem, {
  iContenderListItemProps,
} from '../List/ContenderList/ContenderListItem';
import { iPrediction } from '../../types/api';

type iMovieListProps = {
  predictions: iPrediction[];
  selectedPredictions: iPrediction[]; // for "add predictions"
  setSelectedPredictions: (ps: iPrediction[]) => void; // for "add predictions"
};

const MovieListSelectable = ({
  predictions,
  selectedPredictions,
  setSelectedPredictions,
}: iMovieListProps) => {
  const { event: _event, category: _category } = useEvent();
  const category = _category!;
  const event = _event!;
  const { type } = event.categories[category];

  const [selectedContenderId, setSelectedContenderId] = useState<string | undefined>(); // this selection is whether the film is big or not

  const onPressItem = async (prediction: iPrediction) => {
    Keyboard.dismiss();
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
      contentContainerStyle={{ paddingBottom: 100 }}
      onScroll={() => {
        Keyboard.dismiss();
      }}
      keyboardShouldPersistTaps={'always'}
      renderItem={({ item: prediction, index: i }) => {
        const highlighted = (selectedPredictions || [])
          .map((sp) => sp.contenderId)
          .includes(prediction.contenderId);

        const listItemProps: iContenderListItemProps = {
          variant: 'selectable',
          prediction,
          ranking: i + 1,
          isSelected: selectedContenderId === prediction.contenderId,
          onPressItem,
          onPressThumbnail,
          categoryType: type,
          highlighted,
        };
        return <ContenderListItem {...listItemProps} />;
      }}
    />
  );
};

export default MovieListSelectable;
