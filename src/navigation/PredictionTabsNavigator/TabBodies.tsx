import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import COLORS from '../../constants/colors';
import { usePersonalCommunityTab } from '../../context/PersonalCommunityContext';
import Animated from 'react-native-reanimated';

/**
 * Note: This component is a bit whack but it's done in this way to prevent re-renders of lists
 * We call the setPersonalCommunityTab function manually WHEN we navigate, instead of calling it inside here
 */
const TabBodies = ({
  personal,
  community,
}: {
  personal: JSX.Element;
  community: JSX.Element;
}) => {
  const { width } = useWindowDimensions();
  const { tabsPosX } = usePersonalCommunityTab();

  return (
    <Animated.View
      style={[
        { left: tabsPosX },
        { backgroundColor: COLORS.primaryDark, flexDirection: 'row', height: '100%' },
      ]}
    >
      <View style={{ width, height: '100%' }}>{personal}</View>
      <View style={{ width, height: '100%' }}>{community}</View>
    </Animated.View>
  );
};

export default TabBodies;
