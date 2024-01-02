import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import CategoryPersonal from './CategoryPersonal';
import {
  PredictionsNavigationProp,
  PredictionsParamList,
} from '../../../navigation/types';
import { eventToString } from '../../../util/stringConversions';
import { getHeaderTitleWithTrophy } from '../../../constants';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useRouteParams } from '../../../hooks/useRouteParams';
import CategoryCommunity from './CategoryCommunity';
import { usePersonalCommunityTab } from '../../../context/EventContext';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { useAuth } from '../../../context/AuthContext';

const Category = () => {
  const { params } = useRoute<RouteProp<PredictionsParamList, 'Category'>>();
  const showEventLink = params?.showEventLink || false;
  const { userId: authUserId } = useAuth();
  const isAuthUser = params?.userInfo?.userId === authUserId;

  const { userInfo, category, event } = useRouteParams();
  const { userName, userImage } = userInfo ?? {};

  const navigation = useNavigation<PredictionsNavigationProp>();

  // Set the header
  useLayoutEffect(() => {
    if (!category || !event) return;
    const eventName = eventToString(event.awardsBody, event.year);
    const categoryName = event.categories[category].name;
    const headerTitle = eventName + '\n' + 'Best ' + categoryName;
    navigation.setOptions({
      headerTitle: getHeaderTitleWithTrophy(headerTitle, event.awardsBody),
    });
  }, [navigation]);

  const { personalCommunityTab, setPersonalCommunityTab } = usePersonalCommunityTab();
  const initialTab = useRef<'personal' | 'community'>(personalCommunityTab);
  const [, setCurrentTab] = useState<'personal' | 'community'>(initialTab.current);

  // Allows us to track the current tab so we can set it onBack
  const onBack = useCallback(() => {
    setCurrentTab((curr) => {
      setPersonalCommunityTab(curr);
      return curr;
    });
  }, []);

  return (
    <PredictionTabsNavigator
      onChangeTab={setCurrentTab}
      personalText={isAuthUser ? 'My Predictions' : userName}
      personalImage={isAuthUser ? undefined : userImage}
      personal={<CategoryPersonal showEventLink={showEventLink} onBack={onBack} />}
      community={<CategoryCommunity showEventLink={showEventLink} />}
    />
  );
};

export default Category;
