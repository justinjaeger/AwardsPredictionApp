import React, { useLayoutEffect } from 'react';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import CategoryCommunity from './CategoryCommunity';
import CategoryPersonal from './CategoryPersonal';
import { useTypedNavigation } from '../../../util/hooks';
import { PredictionsParamList } from '../../../navigation/types';
import { getAwardsBodyCategories } from '../../../constants/categories';
import { useEvent } from '../../../context/EventContext';
import { eventToString } from '../../../util/stringConversions';
import { getHeaderTitleWithTrophy } from '../../../constants';
import { useCategoryDisplay } from '../../../hooks/animatedState/useDisplay';
import { Animated } from 'react-native';
import { CategoryDisplayFab } from '../../../components/Buttons/DisplayFAB';
import { useAuth } from '../../../context/AuthContext';
import { RouteProp, StackActions, useRoute } from '@react-navigation/native';
import FollowingBottomScroll from '../../../components/FollowingBottomScroll';
import { iCategoryDisplayState } from '../../../context/DisplayStateContext';
import { CategoryName, PredictionSet, WithId } from '../../../types/api';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';
import useQueryGetUserPredictions from '../../../hooks/queries/useQueryGetUserPredictions';

export type iCategoryProps = {
  collapsedOpacity: Animated.Value;
  expandedOpacity: Animated.Value;
  gridOpacity: Animated.Value;
  delayedDisplay: iCategoryDisplayState;
  userId: string | undefined;
  predictionData: WithId<PredictionSet> | undefined;
  isLoading: boolean;
  showEventLink?: boolean;
};

// Essentially "Category with personal/community tabs" (uses usePredictionData)
const Category = () => {
  const { params } = useRoute<RouteProp<PredictionsParamList, 'Category'>>();
  const { userId: authUserId } = useAuth();
  const userId = params?.userId || authUserId;
  const showEventLink = params?.showEventLink || false;

  const { category, event: _event, isEditing } = useEvent();
  const event = _event!;
  const navigation = useTypedNavigation<PredictionsParamList>();
  const { delayedDisplay, gridOpacity, collapsedOpacity, expandedOpacity } =
    useCategoryDisplay();

  const { data: personalPredictionData, isLoading: personalIsLoading } =
    useQueryGetUserPredictions(userId);
  const { data: communityPredictionData, isLoading: communityIsLoading } =
    useQueryGetCommunityPredictions();

  const props = {
    delayedDisplay,
    gridOpacity,
    collapsedOpacity,
    expandedOpacity,
    userId,
  };

  // Set the header
  useLayoutEffect(() => {
    if (!category || !event) return;
    const awardsBodyCategories = getAwardsBodyCategories(event.awardsBody, event.year);
    const eventName = eventToString(event.awardsBody, event.year);
    const categoryName = awardsBodyCategories[CategoryName[category]]?.name || '';
    const headerTitle = eventName + '\n' + 'Best ' + categoryName;
    navigation.setOptions({
      headerTitle: getHeaderTitleWithTrophy(headerTitle, event.awardsBody),
    });
  }, [navigation]);

  return (
    <>
      <CategoryDisplayFab />
      {PredictionTabsNavigator(
        <CategoryPersonal
          predictionData={personalPredictionData}
          isLoading={personalIsLoading}
          showEventLink={showEventLink && !isEditing}
          {...props}
        />,
        <CategoryCommunity
          predictionData={communityPredictionData}
          isLoading={communityIsLoading}
          showEventLink={showEventLink && !isEditing}
          {...props}
        />,
      )}
      {userId && !isEditing ? (
        <FollowingBottomScroll
          onPress={(id) => {
            navigation.dispatch(StackActions.push('CategoryFromProfile', { userId: id }));
          }}
        />
      ) : null}
    </>
  );
};

export default Category;
