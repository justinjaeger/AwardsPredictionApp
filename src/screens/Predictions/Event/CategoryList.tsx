import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { PredictionsNavigationProp } from '../../../navigation/types';
import { usePersonalCommunityTab } from '../../../context/EventContext';
import SignedOutState from '../../../components/SignedOutState';
import _ from 'lodash';
import { formatLastUpdated } from '../../../util/formatDateTime';
import LastUpdatedText from '../../../components/LastUpdatedText';
import { useAuth } from '../../../context/AuthContext';
import { StackActions, useNavigation } from '@react-navigation/native';
import {
  CategoryName,
  PredictionSet,
  WithId,
  iCategoryPrediction,
} from '../../../types/api';
import EventSkeleton from '../../../components/Skeletons/EventSkeleton';
import { getOrderedCategories } from '../../../util/sortByObjectOrder';
import CategoryListItem from './CategoryListItem';
import { useRouteParams } from '../../../hooks/useRouteParams';
import theme from '../../../constants/theme';
import Stat from '../../../components/ItemStatBox.tsx/Stat';

// TODO: we'll want to make a request for event accolades here nad compare the user's predictions to them
// and if yyyymmdd is passed as param, display on the user/community predictions the accolades
const CategoryList = ({
  tab,
  predictionData,
  isLoading,
}: {
  tab: 'personal' | 'community';
  predictionData: WithId<PredictionSet> | undefined;
  isLoading: boolean;
}) => {
  const { userId: authUserId } = useAuth();
  const { userInfo, event, yyyymmdd } = useRouteParams();
  const { setPersonalCommunityTab } = usePersonalCommunityTab();
  const navigation = useNavigation<PredictionsNavigationProp>();

  const isAuthProfile = userInfo?.userId === authUserId;

  const onSelectCategory = async (category: CategoryName) => {
    setPersonalCommunityTab(tab);
    const params = { userInfo, eventId: event!._id, category };
    if (isAuthProfile || tab === 'community') {
      navigation.navigate('Category', params);
    } else {
      navigation.dispatch(StackActions.push('Category', params));
    }
  };

  const onPress = useCallback(async (category: CategoryName) => {
    onSelectCategory(category);
  }, []);

  if (!userInfo?.userId && tab === 'personal') {
    return <SignedOutState />;
  }

  const iterablePredictionData = _.values(predictionData?.categories || {});

  // only applies to community since all categories are updated at once
  const lastUpdated =
    tab === 'community'
      ? // if community, all categories were last updated at same time
        iterablePredictionData[0]?.createdAt || ''
      : // if personal, find the most recent updatedAt on category (bc this is for entire event)
        iterablePredictionData.reduce((acc: Date, prediction) => {
          const curUpdatedAt = prediction.createdAt;
          if (curUpdatedAt > acc) {
            acc = curUpdatedAt;
          }
          return acc;
        }, new Date('1970-01-01'));
  const lastUpdatedString = formatLastUpdated(new Date(lastUpdated || ''));

  if (isLoading ?? !predictionData) {
    return <EventSkeleton />;
  }

  const unorderedCategories = (predictionData?.categories || {}) as Record<
    CategoryName,
    iCategoryPrediction
  >;
  const orderedPredictions = event
    ? getOrderedCategories(event, unorderedCategories)
    : [];

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <FlatList
        data={orderedPredictions}
        ListHeaderComponent={
          // TODO: not !, and make formatYyyymmdd(yyyymmdd)
          !yyyymmdd ? (
            <View
              style={{
                marginTop: theme.windowMargin,
              }}
            >
              {/** TODO: This is where display stats. Have to access */}
              <Stat number={'77.7%'} text="text" />
            </View>
          ) : (
            <LastUpdatedText lastUpdated={lastUpdatedString} />
          )
        }
        keyExtractor={([catName]) => catName}
        renderItem={({ item }) => {
          return (
            <CategoryListItem
              item={item}
              onPress={onPress}
              isAuthProfile={isAuthProfile}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoryList;
