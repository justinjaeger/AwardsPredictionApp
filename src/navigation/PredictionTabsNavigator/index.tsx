import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  TouchableHighlight,
  useWindowDimensions,
  View,
} from 'react-native';
import { BodyBold } from '../../components/Text';
import { BOTTOM_TAB_HEIGHT } from '../../constants';
import COLORS from '../../constants/colors';
import { useCategory } from '../../context/CategoryContext';

const HIGHLIGHT_COLOR = COLORS.secondary;

const PredictionTab = (props: {
  text: string;
  selected: boolean;
  onPress: () => void;
}) => {
  const { text, selected, onPress } = props;
  return (
    <TouchableHighlight
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '50%',
        borderRadius: 0,
      }}
      onPress={onPress}
      underlayColor={COLORS.secondaryDark}
    >
      <View style={{ zIndex: 3 }}>
        <BodyBold
          style={{
            zIndex: 3,
            color: selected ? HIGHLIGHT_COLOR : COLORS.white,
            textAlign: 'center',
          }}
        >
          {text}
        </BodyBold>
      </View>
    </TouchableHighlight>
  );
};

const PredictionTabsNavigator = (community: JSX.Element, personal: JSX.Element) => {
  const { width } = useWindowDimensions();
  const { personalCommunityTab, setPersonalCommunityTab } = useCategory();
  const scrollBarPositionTwo = width / 2;

  const [initialTab] = useState<'personal' | 'community'>(
    personalCommunityTab || 'community',
  );

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollBarAnim = useRef(
    new Animated.Value(initialTab === 'community' ? 0 : scrollBarPositionTwo),
  ).current;

  const SCROLL_BAR_WIDTH = width / 2;

  useEffect(() => {
    personalCommunityTab === 'community' ? openCommunityTab() : openPersonalTab();
  }); // we WANT no dependencies, or else the last scrollViewRef state will persist, depite possibly having changed it

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
          height: BOTTOM_TAB_HEIGHT,
          width,
          backgroundColor: COLORS.primary,
        }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            transform: [{ translateX: scrollBarAnim }],
            width: SCROLL_BAR_WIDTH,
            backgroundColor: HIGHLIGHT_COLOR,
            height: 4,
            borderRadius: 5,
            zIndex: 2,
          }}
        />
        <PredictionTab
          text={'Community'}
          onPress={() => openCommunityTab()}
          selected={personalCommunityTab === 'community'}
        />
        <PredictionTab
          text={'My Predictions'}
          onPress={() => openPersonalTab()}
          selected={personalCommunityTab === 'personal'}
        />
      </View>
    </>
  );
};

export default PredictionTabsNavigator;
