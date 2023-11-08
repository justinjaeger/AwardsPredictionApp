import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { PredictionsParamList } from '../../../navigation/types';
import { useTypedNavigation } from '../../../util/hooks';
import { useEvent } from '../../../context/EventContext';
import SignedOutState from '../../../components/SignedOutState';
import _ from 'lodash';
import { formatLastUpdated } from '../../../util/formatDateTime';
import LastUpdatedText from '../../../components/LastUpdatedText';
import { useAuth } from '../../../context/AuthContext';
import { StackActions } from '@react-navigation/native';
import {
  CategoryName,
  PredictionSet,
  WithId,
  iCategoryPrediction,
} from '../../../types/api';
import EventSkeleton from '../../../components/Skeletons/EventSkeleton';
import { getOrderedCategories } from '../../../util/sortByObjectOrder';
import EventItem from './EventItem';
import CarouselSkeleton from '../../../components/Skeletons/CarouselSkeleton';

// This is shared by EventPersonalCommunity AND EventFromProfile
const Event = ({
  tab,
  userId,
  userName,
  userImage,
  predictionData,
  isLoading,
}: {
  tab: 'personal' | 'community';
  userId: string | undefined; // if undefined means user is logged out
  userName?: string | undefined;
  userImage?: string | undefined;
  predictionData: WithId<PredictionSet> | undefined;
  isLoading: boolean;
}) => {
  const { userId: authUserId } = useAuth();
  const { event, setCategory, setPersonalCommunityTab } = useEvent();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const isAuthProfile = userId === authUserId;

  const [numToShow, setNumToShow] = useState<number>(30); // essentially making this useless cause it's annoying

  const onSelectCategory = async (category: CategoryName) => {
    setCategory(category);
    setPersonalCommunityTab(tab);
    if (isAuthProfile || tab === 'community') {
      navigation.navigate('Category', { userId });
    } else {
      navigation.dispatch(
        StackActions.push('CategoryFromProfile', { userId, userName, userImage }),
      );
    }
  };

  const onPress = useCallback(async (category: CategoryName) => {
    onSelectCategory(category);
  }, []);

  if (!userId && tab === 'personal') {
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
    ? getOrderedCategories(event.awardsBody, event.year, unorderedCategories)
    : [];

  const onEndReached = () => {
    setNumToShow(numToShow + 5);
  };

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <FlatList
        data={orderedPredictions.slice(0, numToShow)}
        ListHeaderComponent={<LastUpdatedText lastUpdated={lastUpdatedString} />}
        ListFooterComponent={
          numToShow < orderedPredictions.length ? <CarouselSkeleton renderLabel /> : null
        }
        keyExtractor={([catName]) => catName}
        renderItem={({ item }) => {
          return (
            <EventItem item={item} onPress={onPress} isAuthProfile={isAuthProfile} />
          );
        }}
        onScrollEndDrag={(e) => {
          // Fetches more at bottom of scroll. Note the high event throttle to prevent too many requests
          // get position of current scroll
          const currentOffset = e.nativeEvent.contentOffset.y;
          // get max bottom of scroll
          const maxOffset =
            e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height;
          // if we're close to the bottom fetch more
          if (currentOffset > maxOffset - 200) {
            onEndReached();
          }
        }}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5} // triggers onEndReached at (X*100)% of list, for example 0.9 = 90% down
      />
    </View>
  );
};

export default Event;
