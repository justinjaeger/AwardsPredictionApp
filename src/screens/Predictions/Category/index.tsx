import React, { useLayoutEffect } from 'react';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import CategoryCommunity from './CategoryCommunity';
import CategoryPersonal from './CategoryPersonal';
import { useTypedNavigation } from '../../../util/hooks';
import { PredictionsParamList } from '../../../navigation/types';
import { getAwardsBodyCategories } from '../../../constants/categories';
import { CategoryName } from '../../../API';
import { useCategory } from '../../../context/CategoryContext';
import { eventToString } from '../../../util/stringConversions';
import { getHeaderTitleWithTrophy } from '../../../constants';
import { useCategoryDisplay } from '../../../hooks/animatedState/useDisplay';
import { Animated } from 'react-native';
import { CategoryDisplayFab } from '../../../components/Buttons/DisplayFAB';
import { iEvent, iIndexedPredictionsByCategory } from '../../../types';
import { useAuth } from '../../../context/UserContext';
import { RouteProp, StackActions, useRoute } from '@react-navigation/native';
import usePredictionData from '../../../hooks/queries/usePredictionData';
import FollowingBottomScroll from '../../../components/FollowingBottomScroll';
import { iCategoryDisplayState } from '../../../context/DisplayStateContext';

export type iCategoryProps = {
  collapsedOpacity: Animated.Value;
  expandedOpacity: Animated.Value;
  gridOpacity: Animated.Value;
  delayedDisplay: iCategoryDisplayState;
  userId: string | undefined;
  predictionData: iIndexedPredictionsByCategory | undefined;
  isLoading: boolean;
  showEventLink?: boolean;
};

// Essentially "Category with personal/community tabs" (uses usePredictionData)
const Category = () => {
  const { params } = useRoute<RouteProp<PredictionsParamList, 'Category'>>();
  const { userId: authUserId } = useAuth();
  const userId = params?.userId || authUserId;
  const showEventLink = params?.showEventLink || false;

  const { category, event: _event, date, isEditing } = useCategory();
  const isHistory = !!date;
  const navigation = useTypedNavigation<PredictionsParamList>();
  const {
    delayedDisplay,
    gridOpacity,
    collapsedOpacity,
    expandedOpacity,
  } = useCategoryDisplay();

  const {
    predictionData: personalPredictionData,
    isLoading: personalIsLoading,
  } = usePredictionData('personal', userId);
  const {
    predictionData: communityPredictionData,
    isLoading: communityIsLoading,
  } = usePredictionData('community', userId);

  const event = _event as iEvent;

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
    const categoryName = awardsBodyCategories[CategoryName[category.name]]?.name || '';
    const headerTitle = eventName + '\n' + 'Best ' + categoryName;
    navigation.setOptions({
      headerTitle: getHeaderTitleWithTrophy(headerTitle, event.awardsBody),
    });
  }, [navigation]);

  // TODO: History is always open in archived state
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
      {userId && !isHistory && !isEditing ? (
        <FollowingBottomScroll
          userId={userId}
          onPress={(id) => {
            navigation.dispatch(StackActions.push('CategoryFromProfile', { userId: id }));
          }}
        />
      ) : null}
    </>
  );
};

export default Category;
