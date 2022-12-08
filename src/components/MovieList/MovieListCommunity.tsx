import { Divider } from '@ui-kitten/components';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { getCategorySlots } from '../../constants/categories';
import COLORS from '../../constants/colors';
import { useCategory } from '../../context/CategoryContext';
import { iCategory, iEvent, iPrediction } from '../../types';
import ContenderListItem from '../List/ContenderList/ContenderListItem';

type iMovieListProps = {
  predictions: iPrediction[];
};

const MovieListCommunity = (props: iMovieListProps) => {
  const { predictions } = props;
  const { event: _event, category: _category } = useCategory();

  const event = _event as iEvent;
  const category = _category as iCategory;

  const [selectedContenderId, setSelectedContenderId] = useState<string | undefined>(); // this selection is whether the film is big or not

  const onPressItem = async (prediction: iPrediction) => {
    const id = prediction.contenderId;
    if (selectedContenderId === id) {
      setSelectedContenderId(undefined);
    } else {
      setSelectedContenderId(id);
    }
  };

  const slots = getCategorySlots(event.year, event?.awardsBody, category.name);

  return (
    <FlatList
      data={predictions}
      keyExtractor={(item) => item.contenderId}
      style={{ width: '100%' }}
      contentContainerStyle={{ paddingBottom: 100 }}
      renderItem={({ item: prediction, index }) => {
        const isMoreThanSlots = index > slots;
        const ranking = isMoreThanSlots ? index : index + 1;
        return (
          <>
            {index === slots ? (
              <Divider
                style={{ margin: 10, borderWidth: 0.5, borderColor: COLORS.secondaryDark }}
              />
            ) : null}
            <ContenderListItem
              prediction={prediction}
              ranking={ranking}
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
              categoryType={category.type}
            />
          </>
        );
      }}
    />
  );
};

export default MovieListCommunity;
