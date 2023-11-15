import React, { useCallback, useLayoutEffect, useRef } from 'react';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import CategoryCommunity from './CategoryCommunity';
import CategoryPersonal from './CategoryPersonal';
import { useTypedNavigation } from '../../../util/hooks';
import { PredictionsParamList } from '../../../navigation/types';
import { useEvent } from '../../../context/EventContext';
import { eventToString } from '../../../util/stringConversions';
import { getHeaderTitleWithTrophy } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import { RouteProp, StackActions, useRoute } from '@react-navigation/native';
import FollowingBottomScroll from '../../../components/FollowingBottomScroll';

// Essentially "Category with personal/community tabs" (uses usePredictionData)
const Category = () => {
  const { params } = useRoute<RouteProp<PredictionsParamList, 'Category'>>();
  const { userId: authUserId } = useAuth();
  const userId = params?.userId || authUserId;
  const showEventLink = params?.showEventLink || false;

  const {
    category,
    event: _event,
    isEditing,
    personalCommunityTab,
    setPersonalCommunityTab,
  } = useEvent();
  const event = _event!;
  const navigation = useTypedNavigation<PredictionsParamList>();

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
    <>
      <PredictionTabsNavigator
        onChangeTab={setCurrentTab}
        personal={
          <CategoryPersonal
            showEventLink={showEventLink && !isEditing}
            userId={userId}
            onBack={onBack}
          />
        }
        community={<CategoryCommunity showEventLink={showEventLink && !isEditing} />}
      />
      {userId && !isEditing ? (
        <FollowingBottomScroll
          onPress={(userId) => {
            navigation.dispatch(StackActions.push('CategoryFromProfile', { userId }));
          }}
        />
      ) : null}
    </>
  );
};

export default Category;
