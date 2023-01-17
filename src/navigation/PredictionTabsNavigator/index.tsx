import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, useWindowDimensions, View } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import HistoryTab from '../../components/HistoryTab';
import { TOP_TAB_HEIGHT } from '../../constants';
import COLORS from '../../constants/colors';
import { useCategory } from '../../context/CategoryContext';
import PredictionTab from './PredictionTab';

const PredictionTabsNavigator = (personal: JSX.Element, community: JSX.Element) => {
  const { width } = useWindowDimensions();
  const { personalCommunityTab, setPersonalCommunityTab } = useCategory();
  const scrollBarPositionTwo = width / 2;

  const [initialTab] = useState<'personal' | 'community'>(
    personalCommunityTab || 'personal',
  );

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollBarAnim = useRef(
    new Animated.Value(initialTab === 'personal' ? 0 : scrollBarPositionTwo),
  ).current;

  const SCROLL_BAR_WIDTH = width / 2;

  useEffect(() => {
    personalCommunityTab === 'community' ? openCommunityTab() : openPersonalTab();
  }); // we WANT no dependencies, or else the last scrollViewRef state will persist, depite possibly having changed it

  const openPersonalTab = (instant?: boolean) => {
    setPersonalCommunityTab('personal');
    scrollViewRef.current?.scrollTo({ x: 0, animated: !instant });
    Animated.timing(scrollBarAnim, {
      toValue: 0,
      duration: instant ? 0 : 250,
      useNativeDriver: true,
    }).start();
  };

  const openCommunityTab = (instant?: boolean) => {
    setPersonalCommunityTab('community');
    scrollViewRef.current?.scrollTo({ x: width, animated: !instant });
    Animated.timing(scrollBarAnim, {
      toValue: scrollBarPositionTwo,
      duration: instant ? 0 : 250,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <BackgroundWrapper>
        <>
          <View
            style={{
              flexDirection: 'row',
              height: TOP_TAB_HEIGHT,
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
                height: 4,
                borderRadius: 5,
                zIndex: 2,
              }}
            />
            <PredictionTab
              text={'My Predictions'}
              onPress={() => openPersonalTab()}
              selected={personalCommunityTab === 'personal'}
            />
            <PredictionTab
              text={'Community'}
              onPress={() => openCommunityTab()}
              selected={personalCommunityTab === 'community'}
            />
          </View>
          <HistoryTab />
          <ScrollView
            horizontal
            pagingEnabled
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            scrollEventThrottle={1}
            scrollEnabled={false}
            contentOffset={{
              x: initialTab === 'community' ? 0 : width,
              y: 0,
            }}
          >
            <View style={{ width, height: '100%' }}>{personal}</View>
            <View style={{ width, height: '100%' }}>{community}</View>
          </ScrollView>
        </>
      </BackgroundWrapper>
    </>
  );
};

export default PredictionTabsNavigator;
