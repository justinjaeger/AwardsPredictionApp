import React, { useCallback, useLayoutEffect, useRef } from 'react';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import CategoryCommunity from './CategoryCommunity';
import CategoryPersonal from './CategoryPersonal';
import { useTypedNavigation } from '../../../util/hooks';
import { PredictionsParamList } from '../../../navigation/types';
import { usePersonalCommunityTab } from '../../../context/EventContext';
import { eventToString } from '../../../util/stringConversions';
import { getTwoLineHeaderTitle } from '../../../constants';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useRouteParams } from '../../../hooks/useRouteParams';

// Essentially "Category with personal/community tabs" (uses usePredictionData)
const Category = () => {
  const { params } = useRoute<RouteProp<PredictionsParamList, 'Category'>>();
  const showEventLink = params?.showEventLink || false;

  const { category, event: _event } = useRouteParams();
  const event = _event!;

  const { personalCommunityTab, setPersonalCommunityTab } = usePersonalCommunityTab();
  const navigation = useTypedNavigation<PredictionsParamList>();

  // Set the header
  useLayoutEffect(() => {
    if (!category || !event) return;
    const eventName = eventToString(event.awardsBody, event.year);
    const categoryName = event.categories[category].name;
    const headerTitle = eventName + '\n' + 'Best ' + categoryName;
    navigation.setOptions({
      headerTitle: getTwoLineHeaderTitle(headerTitle),
    });
  }, [navigation]);

  const initialTab = useRef<'personal' | 'community'>(personalCommunityTab);

  const [, setCurrentTab] = React.useState<'personal' | 'community'>(initialTab.current);

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
      personal={<CategoryPersonal showEventLink={showEventLink} onBack={onBack} />}
      community={<CategoryCommunity showEventLink={showEventLink} />}
    />
  );
};

export default Category;
