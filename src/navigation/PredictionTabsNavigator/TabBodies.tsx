import React from 'react';
import { Animated, useWindowDimensions, View } from 'react-native';
import COLORS from '../../constants/colors';
import { usePersonalCommunityTab } from '../../context/EventContext';

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
  const { scrollPosX } = usePersonalCommunityTab();
  // What we can do is, instead of horizontal paginted scroll view,
  // we can animate the translateX property of the parent view
  // so all the "horizontalTabsScrollViewRef.scrollTo" is actually running a callback to change the translateX value

  // Below is basically a proof of concept that we can put personal+community items into a flatlist
  // Because essentially you can wrap EACH ITEM of the flatlist with this component

  // TODO: what is the initial value?

  return (
    <Animated.View
      style={[
        { transform: [{ translateX: scrollPosX }] },
        { backgroundColor: COLORS.primaryDark, flexDirection: 'row' },
      ]}
    >
      <View style={{ width, height: '100%' }}>{personal}</View>
      <View style={{ width, height: '100%' }}>{community}</View>
    </Animated.View>
  );
};

export default TabBodies;
