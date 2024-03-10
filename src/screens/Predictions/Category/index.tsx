import React, { useRef } from 'react';
import CategoryPersonal from './CategoryPersonal';
import { PredictionsParamList } from '../../../navigation/types';
import { eventToString } from '../../../util/stringConversions';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useRouteParams } from '../../../hooks/useRouteParams';
import CategoryCommunity from './CategoryCommunity';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { PHASE_TO_STRING_PLURAL } from '../../../constants/categories';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { View } from 'react-native';
import HeaderBasic from '../../../components/HeaderBasic';
import DualTabsWrapper from '../../../components/DualTabsWrapper';
import { usePersonalCommunityTab } from '../../../context/PersonalCommunityContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getBottomHeight } from '../../../util/getBottomHeight';

const Category = () => {
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const { tabsPosX, personalCommunityTab, setPersonalCommunityTab } =
    usePersonalCommunityTab();
  const { params } = useRoute<RouteProp<PredictionsParamList, 'Category'>>();
  const showEventLink = params?.showEventLink || false;

  const { category, event, phase, isLeaderboard } = useRouteParams();

  let headerText = '';
  if (event && category) {
    const eventName = eventToString(event.awardsBody, event.year);
    const categoryName = event.categories[category].name;
    const leaderboardTitle =
      isLeaderboard && phase ? `\n${PHASE_TO_STRING_PLURAL[phase]}` : '';
    const headerTitle = `${eventName}\nBest ${categoryName} ${leaderboardTitle || ''}`;
    headerText = headerTitle;
  }

  const bottomHeight = getBottomHeight(top, headerText);

  // we can do this because it's not used in the render; only accessed on the back func
  const ref = useRef(personalCommunityTab);

  return (
    <BackgroundWrapper>
      <View style={{ flex: 1, width: '100%' }}>
        <HeaderBasic
          title={headerText}
          safeAreaTop
          onPressBack={() => {
            navigation.goBack();
            setPersonalCommunityTab(ref.current, true);
          }}
        />
        <PredictionTabsNavigator
          type={event?.eventType === 'list' ? 'list' : 'prediction'}
          onOpenTab={(t) => (ref.current = t)}
        />
        <DualTabsWrapper
          tab1={
            <CategoryPersonal showEventLink={showEventLink} bottomHeight={bottomHeight} />
          }
          tab2={
            <CategoryCommunity
              showEventLink={showEventLink}
              bottomHeight={bottomHeight}
            />
          }
          tabsPosX={tabsPosX}
        />
      </View>
    </BackgroundWrapper>
  );
};

export default Category;
