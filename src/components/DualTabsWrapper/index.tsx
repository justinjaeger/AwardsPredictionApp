import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import COLORS from '../../constants/colors';
import Animated, { SharedValue } from 'react-native-reanimated';

/**
 * Use it with SectionTopTabs and pass in a shared "tabsPosX" for each to get animated tab switching
 */
const DualTabsWrapper = ({
  tab1,
  tab2,
  tabsPosX,
}: {
  tab1: JSX.Element;
  tab2: JSX.Element;
  tabsPosX: SharedValue<number>;
}) => {
  const { width } = useWindowDimensions();

  return (
    <Animated.View
      style={[
        { backgroundColor: COLORS.primaryDark, flexDirection: 'row' },
        { left: tabsPosX },
      ]}
    >
      <View style={{ width, height: '100%' }}>{tab1}</View>
      <View style={{ width, height: '100%' }}>{tab2}</View>
    </Animated.View>
  );
};

export default DualTabsWrapper;
