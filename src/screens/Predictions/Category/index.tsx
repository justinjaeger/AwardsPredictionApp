import React, { useLayoutEffect } from 'react';
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
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { PHASE_TO_STRING_PLURAL } from '../../../constants/categories';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import TabBodies from '../../../navigation/PredictionTabsNavigator/TabBodies';
import { View } from 'react-native';

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
    const leaderboardTitle =
      isLeaderboard && phase ? ` • ${PHASE_TO_STRING_PLURAL[phase]}` : '';
    const headerTitle =
      eventName + '\n' + 'Best ' + categoryName + (leaderboardTitle || '');
    navigation.setOptions({
      headerTitle: getTwoLineHeaderTitle(headerTitle),
    });
  }, [navigation]);

  return (
    <BackgroundWrapper>
      <View style={{ width: '100%' }}>
        <PredictionTabsNavigator />
        <TabBodies
          personal={<CategoryPersonal key="p" showEventLink={showEventLink} />}
          community={<CategoryCommunity key="c" showEventLink={showEventLink} />}
        />
      </View>
    </BackgroundWrapper>
  );
};

export default Category;
