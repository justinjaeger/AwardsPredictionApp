import { Divider } from '@ui-kitten/components';
import React, { useState } from 'react';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { PredictionType } from '../../API';
import { getCategorySlots } from '../../constants/categories';
import COLORS from '../../constants/colors';
import { eventStatusToPredictionType } from '../../constants/events';
import theme from '../../constants/theme';
import { useCategory } from '../../context/CategoryContext';
import { iCategory, iEvent, iPrediction } from '../../types';
import LastUpdatedText from '../LastUpdatedText';
import ContenderListItem from '../List/ContenderList/ContenderListItem';
import ContenderListItemCondensed from '../List/ContenderList/ContenderListItemCondensed';

type iMovieListProps = {
  predictions: iPrediction[];
  setPredictions: (ps: iPrediction[]) => void;
  lastUpdatedString: string;
  isCollapsed?: boolean;
};

const MovieListDraggable = ({
  predictions,
  setPredictions,
  isCollapsed,
  lastUpdatedString,
}: iMovieListProps) => {
  const { event: _event, category: _category, date } = useCategory();
  const isHistory = !!date;

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

  let slots = getCategorySlots(event, category.name);
  const nominationsHaveHappened =
    eventStatusToPredictionType(event.status) === PredictionType.WIN;
  if (nominationsHaveHappened) slots = 1; // want to have the number one slot be sectioned off

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
      ListHeaderComponent={
        <LastUpdatedText lastUpdated={lastUpdatedString} isDisabled={isHistory} />
      }
      renderItem={({ item: prediction, index: _index, drag, isActive }) => {
        const index = _index || 0;
        const ranking = index + 1;
        return (
          <>
            {index === slots ? (
              <Divider
                style={{
                  margin: 10,
                  backgroundColor: isActive ? 'transparent' : COLORS.secondary,
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
