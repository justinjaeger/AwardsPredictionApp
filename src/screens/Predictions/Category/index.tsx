import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import CategoryPersonal from './CategoryPersonal';
import {
  PredictionsNavigationProp,
  PredictionsParamList,
} from '../../../navigation/types';
import { eventToString } from '../../../util/stringConversions';
import { getTwoLineHeaderTitle } from '../../../constants';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useRouteParams } from '../../../hooks/useRouteParams';
import CategoryCommunity from './CategoryCommunity';
import { usePersonalCommunityTab } from '../../../context/EventContext';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { PHASE_TO_STRING } from '../../../constants/categories';

const Category = () => {
  const { params } = useRoute<RouteProp<PredictionsParamList, 'Category'>>();
  const showEventLink = params?.showEventLink || false;

  const { category, event, phase, isLeaderboard } = useRouteParams();

  const navigation = useNavigation<PredictionsNavigationProp>();

  // Set the header
  useLayoutEffect(() => {
    if (!category || !event) return;
    const eventName = eventToString(event.awardsBody, event.year);
    const categoryName = event.categories[category].name;
    const leaderboardTitle = isLeaderboard
      ? `\n${PHASE_TO_STRING[phase]} LB Results`
      : '';
    const headerTitle =
      (leaderboardTitle ? '' : eventName + '\n') +
      'Best ' +
      categoryName +
      (leaderboardTitle || '');
    navigation.setOptions({
      headerTitle: getTwoLineHeaderTitle(headerTitle),
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
      userInfo={params?.userInfo}
      personal={<CategoryPersonal showEventLink={showEventLink} onBack={onBack} />}
      community={<CategoryCommunity showEventLink={showEventLink} />}
    />
  );
};

export default Category;
