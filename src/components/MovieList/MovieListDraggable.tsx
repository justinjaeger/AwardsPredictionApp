import React, { useState } from 'react';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import theme from '../../constants/theme';
import { iPrediction } from '../../store/types';
import ContenderListItem from '../List/ContenderList/ContenderListItem';

type iMovieListProps = {
  predictions: iPrediction[];
  setPredictions: (ps: iPrediction[]) => void;
};

const MovieListDraggable = (props: iMovieListProps) => {
  const { predictions, setPredictions } = props;

  const [selectedContenderId, setSelectedContenderId] = useState<string | undefined>(); // this selection is whether the film is big or not

  const onPressThumbnail = (prediction: iPrediction) => {
    const id = prediction.contenderId;
    if (selectedContenderId === id) {
      setSelectedContenderId(undefined);
    } else {
      setSelectedContenderId(id);
    }
  };

  return (
    <DraggableFlatList
      data={predictions}
      keyExtractor={(item) => item.contenderId}
      style={{ width: '100%' }}
      contentContainerStyle={{
        paddingBottom: 100,
        paddingTop: theme.windowMargin,
      }}
      renderItem={({ item: prediction, index, drag, isActive }) => (
        <ScaleDecorator activeScale={0.9}>
          <ContenderListItem
            variant={'personal'}
            prediction={prediction}
            ranking={(index || 0) + 1}
            selected={selectedContenderId === prediction.contenderId}
            onPressItem={(item) => {
              const id = item.contenderId;
              if (selectedContenderId === id) {
                setSelectedContenderId(undefined);
              } else {
                setSelectedContenderId(id);
              }
            }}
            onPressThumbnail={onPressThumbnail}
            draggable={{
              drag,
              isActive,
            }}
          />
        </ScaleDecorator>
      )}
      onDragEnd={({ data }) => {
        setPredictions(data);
      }}
    />
  );
};

export default MovieListDraggable;
