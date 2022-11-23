import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { iPrediction } from '../../store/types';
import ContenderListItem from '../List/ContenderList/ContenderListItem';

type iMovieListProps = {
  predictions: iPrediction[];
};

const MovieListCommunity = (props: iMovieListProps) => {
  const { predictions } = props;

  const [selectedContenderId, setSelectedContenderId] = useState<string | undefined>(); // this selection is whether the film is big or not

  const onPressItem = async (prediction: iPrediction) => {
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
        return (
          <ContenderListItem
            prediction={prediction}
            ranking={i + 1}
            onPressItem={onPressItem}
            onPressThumbnail={(item) => {
              const id = item.contenderId;
              if (selectedContenderId === id) {
                setSelectedContenderId(undefined);
              } else {
                setSelectedContenderId(id);
              }
            }}
            selected={selectedContenderId === prediction.contenderId}
            variant={'community'}
          />
        );
      }}
    />
  );
};

export default MovieListCommunity;
