import { Divider } from '@ui-kitten/components';
import React, { useState } from 'react';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { getCategorySlots } from '../../constants/categories';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { useCategory } from '../../context/CategoryContext';
import { iCategory, iEvent, iPrediction } from '../../types';
import ContenderListItem from '../List/ContenderList/ContenderListItem';
import ContenderListItemCondensed from '../List/ContenderList/ContenderListItemCondensed';

type iMovieListProps = {
  predictions: iPrediction[];
  setPredictions: (ps: iPrediction[]) => void;
  isCollapsed?: boolean;
};

const MovieListDraggable = (props: iMovieListProps) => {
  const { predictions, setPredictions, isCollapsed } = props;
  const { event: _event, category: _category } = useCategory();

  const event = _event as iEvent;
  const category = _category as iCategory;

  const [selectedContenderId, setSelectedContenderId] = useState<string | undefined>(); // this selection is whether the film is big or not

  const onPressThumbnail = (prediction: iPrediction) => {
    const id = prediction.contenderId;
    if (selectedContenderId === id) {
      setSelectedContenderId(undefined);
    } else {
      setSelectedContenderId(id);
    }
  };

  const slots = getCategorySlots(event.year, event?.awardsBody, category.name);

  const onPressItem = (item: iPrediction) => {
    const id = item.contenderId;
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
      renderItem={({ item: prediction, index: _index, drag, isActive }) => {
        const index = _index || 0;
        const ranking = index + 1;
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
            <ScaleDecorator activeScale={0.9}>
              {!isCollapsed ? (
                <ContenderListItem
                  variant={'personal'}
                  prediction={prediction}
                  ranking={ranking}
                  selected={selectedContenderId === prediction.contenderId}
                  onPressItem={onPressItem}
                  onPressThumbnail={onPressThumbnail}
                  draggable={{
                    drag,
                    isActive,
                  }}
                  categoryType={category.type}
                />
              ) : (
                <ContenderListItemCondensed
                  variant={'personal'}
                  prediction={prediction}
                  ranking={ranking}
                  selected={selectedContenderId === prediction.contenderId}
                  onPressItem={onPressItem}
                  onPressThumbnail={onPressThumbnail}
                  draggable={{
                    drag,
                    isActive,
                  }}
                  categoryType={category.type}
                />
              )}
            </ScaleDecorator>
          </>
        );
      }}
      onDragEnd={({ data }) => {
        setPredictions(data);
      }}
    />
  );
};

export default MovieListDraggable;
