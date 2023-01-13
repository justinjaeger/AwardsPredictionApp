import { Divider } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Animated, FlatList, View } from 'react-native';
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
import { BodyBold } from '../Text';

type iMovieListProps = {
  predictions: iPrediction[];
  lastUpdatedString: string;
  isCollapsed?: boolean;
};

const MovieListCommunity = ({
  predictions,
  isCollapsed,
  lastUpdatedString,
}: iMovieListProps) => {
  const { event: _event, category: _category, date } = useCategory();
  const isHistory = !!date;

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

  let slots = getCategorySlots(event, category.name);
  const nominationsHaveHappened =
    eventStatusToPredictionType(event.status) === PredictionType.WIN;
  if (nominationsHaveHappened) slots = 1; // want to have the number one slot be sectioned off

  return (
    <FlatList
      data={predictions}
      keyExtractor={(item) => item.contenderId}
      style={{ width: '100%' }}
      contentContainerStyle={{ paddingBottom: 100 }}
      ListHeaderComponent={
        <>
          <LastUpdatedText lastUpdated={lastUpdatedString} isDisabled={isHistory} />
          {predictions.length > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: theme.windowMargin,
              }}
            >
              <View style={{ flexDirection: 'row' }} />
              <Animated.View
                style={{
                  flexDirection: 'row',
                  width: 120,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {nominationsHaveHappened ? (
                  <View />
                ) : (
                  <View>
                    <BodyBold style={{ textAlign: 'right' }}>Predict</BodyBold>
                    <BodyBold style={{ textAlign: 'right' }}>Nom</BodyBold>
                  </View>
                )}
                <View>
                  <BodyBold style={{ textAlign: 'right' }}>Predict</BodyBold>
                  <BodyBold style={{ textAlign: 'right' }}>Win</BodyBold>
                </View>
              </Animated.View>
            </View>
          ) : null}
        </>
      }
      renderItem={({ item: prediction, index }) => {
        const ranking = index + 1;
        return (
          <>
            {index === slots ? (
              <Divider
                style={{
                  margin: 10,
                  borderWidth: 0.5,
                  borderColor: COLORS.secondary,
                }}
              />
            ) : null}
            {!isCollapsed ? (
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
            ) : (
              <ContenderListItemCondensed
                prediction={prediction}
                onPressItem={() => {}}
                ranking={ranking}
                selected={selectedContenderId === prediction.contenderId}
                variant={'community'}
                categoryType={category.type}
              />
            )}
          </>
        );
      }}
    />
  );
};

export default MovieListCommunity;
