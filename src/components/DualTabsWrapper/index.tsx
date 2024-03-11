import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import COLORS from '../../constants/colors';
import Animated, { SharedValue } from 'react-native-reanimated';

/**
 * Use it with SectionTopTabs and pass in a shared "tabsPosX" for each to get animated tab switching
 */
const DualTabsWrapper = ({
  tabs,
  tabsPosX,
}: {
  tabs: JSX.Element[];
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
      {tabs.map((tab) => (
        <View style={{ width, height: '100%' }}>{tab}</View>
      ))}
    </Animated.View>
  );
};

export default DualTabsWrapper;
