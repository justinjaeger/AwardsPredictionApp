import { useFocusEffect } from '@react-navigation/native';
import { Button } from '@ui-kitten/components';
import React, { useRef, useState } from 'react';
import { Animated, ScrollView, useWindowDimensions, View } from 'react-native';
import COLORS from '../../constants/colors';
import { useCategory } from '../../context/CategoryContext';

const PredictionTabsNavigator = (community: JSX.Element, personal: JSX.Element) => {
  const { width } = useWindowDimensions();
  const { personalCommunityTab, setPersonalCommunityTab } = useCategory();
  const scrollBarPositionTwo = width / 2;

  const [initialTab, setInitialTab] = useState<'personal' | 'community'>(
    personalCommunityTab,
  );

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollBarAnim = useRef(
    new Animated.Value(initialTab === 'community' ? 0 : scrollBarPositionTwo),
  ).current;

  const bottomTabStyles = {
    width: '50%',
    borderRadius: 0,
  };

  const SCROLL_BAR_WIDTH = width / 2 - 20;

  useFocusEffect(
    React.useCallback(() => {
      setInitialTab(personalCommunityTab);
      if (personalCommunityTab === 'community') {
        openCommunityTab(true);
      } else {
        openPersonalTab(true);
      }
    }, []),
  );

  const openCommunityTab = (instant?: boolean) => {
    setPersonalCommunityTab('community');
    scrollViewRef.current?.scrollTo({ x: 0, animated: !instant });
    Animated.timing(scrollBarAnim, {
      toValue: 0,
      duration: instant ? 0 : 250,
      useNativeDriver: true,
    }).start();
  };

  const openPersonalTab = (instant?: boolean) => {
    setPersonalCommunityTab('personal');
    scrollViewRef.current?.scrollTo({ x: width, animated: !instant });
    Animated.timing(scrollBarAnim, {
      toValue: scrollBarPositionTwo,
      duration: instant ? 0 : 250,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
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
        <View style={{ width, height: '100%' }}>{community}</View>
        <View style={{ width, height: '100%' }}>{personal}</View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          borderTopWidth: 1,
          borderColor: COLORS.border,
          height: 60,
          width,
        }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 10,
            transform: [{ translateX: scrollBarAnim }],
            width: SCROLL_BAR_WIDTH,
            backgroundColor: COLORS.primary,
            height: 5,
            borderRadius: 5,
          }}
        />
        <Button
          style={bottomTabStyles}
          appearance="ghost"
          onPress={() => openCommunityTab()}
        >
          Community
        </Button>
        <Button
          style={bottomTabStyles}
          appearance="ghost"
          onPress={() => openPersonalTab()}
        >
          Personal
        </Button>
      </View>
    </>
  );
};

export default PredictionTabsNavigator;
