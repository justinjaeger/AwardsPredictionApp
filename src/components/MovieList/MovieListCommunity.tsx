import { Divider } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Animated, FlatList, View } from 'react-native';
import { getCategorySlots } from '../../constants/categories';
import COLORS from '../../constants/colors';
import { useCategory } from '../../context/CategoryContext';
import { CategoryHeader } from '../../screens/Predictions/styles';
import { iCategory, iEvent, iPrediction } from '../../types';
import ContenderListItem from '../List/ContenderList/ContenderListItem';
import ContenderListItemCondensed from '../List/ContenderList/ContenderListItemCondensed';
import { BodyBold } from '../Text';

type iMovieListProps = {
  predictions: iPrediction[];
  isCollapsed?: boolean;
};

const MovieListCommunity = (props: iMovieListProps) => {
  const { predictions, isCollapsed } = props;
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
      ListHeaderComponent={
        predictions.length > 0 ? (
          <CategoryHeader style={{ height: 50 }}>
            <View style={{ flexDirection: 'row' }} />
            <Animated.View
              style={{
                flexDirection: 'row',
                width: 120,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View>
                <BodyBold style={{ textAlign: 'right' }}>Predict</BodyBold>
                <BodyBold style={{ textAlign: 'right' }}>Nom</BodyBold>
              </View>
              <View>
                <BodyBold style={{ textAlign: 'right' }}>Predict</BodyBold>
                <BodyBold style={{ textAlign: 'right' }}>Win</BodyBold>
              </View>
            </Animated.View>
          </CategoryHeader>
        ) : null
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
