import React from 'react';
import { Animated, View, useWindowDimensions } from 'react-native';
import { usePersonalCommunityTab } from '../../context/PersonalCommunityContext';
import COLORS from '../../constants/colors';

const DualTabsWrapper = ({ tab1, tab2 }: { tab1: JSX.Element; tab2: JSX.Element }) => {
  const { width } = useWindowDimensions();
  const { scrollPosX } = usePersonalCommunityTab();
  return (
    <Animated.View
      style={[
        { transform: [{ translateX: scrollPosX }] },
        { backgroundColor: COLORS.primaryDark, flexDirection: 'row' },
      ]}
    >
      <View style={{ width, height: '100%' }}>{tab1}</View>
      <View style={{ width, height: '100%' }}>{tab2}</View>
    </Animated.View>
  );
};

export default DualTabsWrapper;
