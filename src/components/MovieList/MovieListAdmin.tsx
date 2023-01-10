import { Divider } from '@ui-kitten/components';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { ContenderVisibility } from '../../API';
import { getCategorySlots } from '../../constants/categories';
import COLORS from '../../constants/colors';
import { useCategory } from '../../context/CategoryContext';
import { iCategory, iEvent, iPrediction } from '../../types';
import ContenderListItem from '../List/ContenderList/ContenderListItem';

type iMovieListAdminProps = {
  predictions: iPrediction[];
  onPressItem: (prediction: iPrediction) => void;
};

/**
 * Lets you pass in an onPressItem function, which we use to open a modal and handle more specific functionality there
 */
const MovieListAdmin = (props: iMovieListAdminProps) => {
  const { predictions, onPressItem } = props;
  const { event: _event, category: _category } = useCategory();

  const event = _event as iEvent;
  const category = _category as iCategory;

  const [selectedContenderId, setSelectedContenderId] = useState<string | undefined>(); // this selection is whether the film is big or not

  const slots = getCategorySlots(event.year, event?.awardsBody, category.name);

  return (
    <FlatList
      data={predictions}
      keyExtractor={(item) => item.contenderId}
      style={{ width: '100%' }}
      contentContainerStyle={{ paddingBottom: 100 }}
      renderItem={({ item: prediction, index }) => {
        const ranking = index + 1;
        const visibility =
          prediction.visibility === ContenderVisibility.HIDDEN ? 'hidden' : 'visible';
        const accolade = prediction.accolade || 'none';
        return (
          <>
            {index === slots ? (
              <Divider
                style={{
                  margin: 10,
                  borderWidth: 0.5,
                  borderColor: COLORS.secondaryDark,
                }}
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
              subtitle={`${visibility} • ${accolade}`}
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

export default MovieListAdmin;
