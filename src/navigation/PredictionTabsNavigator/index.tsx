import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, useWindowDimensions, View } from 'react-native';
import COLORS from '../../constants/colors';
import { usePersonalCommunityTab } from '../../context/EventContext';
import PredictionTab from './PredictionTab';
import { useAuth } from '../../context/AuthContext';
import { useRouteParams } from '../../hooks/useRouteParams';
import { truncateText } from '../../util/truncateText';

/**
 * Note: This component is a bit whack but it's done in this way to prevent re-renders of lists
 * We call the setPersonalCommunityTab function manually WHEN we navigate, instead of calling it inside here
 */
const PredictionTabsNavigator = ({
  scrollViewRef,
  onChangeTab,
}: {
  scrollViewRef: React.RefObject<ScrollView>;
  onChangeTab?: (tab: 'personal' | 'community') => void;
}) => {
  const { width } = useWindowDimensions();
  const { personalCommunityTab } = usePersonalCommunityTab();
  const { userId: authUserId } = useAuth();
  const { userInfo } = useRouteParams();
  const isAuthUser = userInfo?.userId === authUserId;
  const scrollBarPositionTwo = width / 2;

  const scrollBarAnim = useRef(
    new Animated.Value(personalCommunityTab === 'personal' ? 0 : scrollBarPositionTwo),
  ).current;

  const SCROLL_BAR_WIDTH = width / 2;

  useEffect(() => {
    personalCommunityTab === 'community' ? openCommunityTab(true) : openPersonalTab(true);
    setTab(personalCommunityTab || 'personal');
  }, [personalCommunityTab]);

  const [tab, setTab] = useState<'personal' | 'community'>(
    personalCommunityTab || 'personal',
  );

  const openPersonalTab = (instant?: boolean) => {
    scrollViewRef.current?.scrollTo({ x: 0, animated: !instant });
    Animated.timing(scrollBarAnim, {
      toValue: 0,
      duration: instant ? 0 : 250,
      useNativeDriver: true,
    }).start();
  };

  const openCommunityTab = (instant?: boolean) => {
    scrollViewRef.current?.scrollTo({ x: width, animated: !instant });
    Animated.timing(scrollBarAnim, {
      toValue: scrollBarPositionTwo,
      duration: instant ? 0 : 250,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        width,
      }}
    >
      {/* ScrollBar */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          transform: [{ translateX: scrollBarAnim }],
          width: SCROLL_BAR_WIDTH,
          backgroundColor: COLORS.white,
          height: 2,
          borderRadius: 5,
          zIndex: 2,
        }}
      />
      <PredictionTab
        text={
          isAuthUser
            ? 'My Predictions'
            : truncateText(userInfo?.userName ?? 'My Predictions', 13)
        }
        userInfo={userInfo}
        onPress={() => {
          scrollViewRef.current?.scrollTo({ y: 0 }); // why no work?
          openPersonalTab();
          onChangeTab && onChangeTab('personal');
          setTab('personal');
        }}
        selected={tab === 'personal'}
      />
      <PredictionTab
        text={'Community'}
        onPress={() => {
          openCommunityTab();
          onChangeTab && onChangeTab('community');
          setTab('community');
        }}
        selected={tab === 'community'}
      />
    </View>
  );
};

export default PredictionTabsNavigator;
