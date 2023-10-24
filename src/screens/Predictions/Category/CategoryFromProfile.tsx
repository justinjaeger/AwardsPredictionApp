import React, { useEffect, useLayoutEffect } from 'react';
import CategoryPersonal from './CategoryPersonal';
import { useTypedNavigation } from '../../../util/hooks';
import { PredictionsParamList } from '../../../navigation/types';
import { getAwardsBodyCategories } from '../../../constants/categories';
import { useEvent } from '../../../context/EventContext';
import { eventToString } from '../../../util/stringConversions';
import { getHeaderTitleWithTrophy } from '../../../constants';
import { Animated, View } from 'react-native';
import { CategoryDisplayFab } from '../../../components/Buttons/DisplayFAB';
import { useAuth } from '../../../context/AuthContext';
import { RouteProp, useRoute } from '@react-navigation/native';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import UserHeader from '../../../components/UserHeader';
import { useProfilePrediction } from '../../../context/ProfilePredictionContext';
import { iCategoryDisplayState } from '../../../context/DisplayStateContext';
import CategorySkeleton from '../../../components/Skeletons/CategorySkeleton';

export type iCategoryProps = {
  collapsedOpacity: Animated.Value;
  expandedOpacity: Animated.Value;
  isCollapsed: boolean;
  delayedDisplay: iCategoryDisplayState;
  listOpacity: Animated.Value;
  gridOpacity: Animated.Value;
  userId: string | undefined;
};

const Category = () => {
  const { params } = useRoute<RouteProp<PredictionsParamList, 'Category'>>();
  const { userId: authUserId } = useAuth();
  const userId = params?.userId || authUserId;
  const showEventLink = params?.showEventLink || false;

  const { category, event: _event } = useEvent();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const { user, isLoading, setUserId } = useProfilePrediction();
  useEffect(() => setUserId(userId), [userId]);

  const event = _event!;

  // Set the header
  useLayoutEffect(() => {
    if (!category || !event) return;
    const awardsBodyCategories = getAwardsBodyCategories(event.awardsBody, event.year);
    const eventName = eventToString(event.awardsBody, event.year);
    const categoryName = awardsBodyCategories[category]?.name || '';
    const headerTitle = eventName + '\n' + 'Best ' + categoryName;
    navigation.setOptions({
      headerTitle: getHeaderTitleWithTrophy(headerTitle, event.awardsBody),
    });
  }, [navigation]);

  if (isLoading) {
    <CategorySkeleton />;
  }

  return (
    <>
      <CategoryDisplayFab />
      <BackgroundWrapper>
        {user ? <UserHeader user={user} showEventLink={showEventLink} /> : null}
        <View style={{ width: '100%' }}>
          <CategoryPersonal userId={userId} showEventLink={showEventLink} />
        </View>
      </BackgroundWrapper>
    </>
  );
};

export default Category;
