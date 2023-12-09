import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useFollowingBar } from '../../context/FollowingBarContext';
import { BOTTOM_TAB_HEIGHT } from '../../constants';

const EXTRA_BOTTOM_HEIGHT = 70;

const BottomFABContainer = ({ children }: { children: React.ReactNode }) => {
  const animatedBottomButtons = useRef(new Animated.Value(0)).current;
  const { isHidden } = useFollowingBar();

  useEffect(() => {
    Animated.timing(animatedBottomButtons, {
      toValue: isHidden ? 0 : EXTRA_BOTTOM_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isHidden]);

  return (
    <Animated.View
      style={{
        transform: [{ translateY: animatedBottomButtons }],
        position: 'absolute',
        right: 0,
        bottom: BOTTOM_TAB_HEIGHT + 30,
        zIndex: 10,
        flexDirection: 'row',
      }}
    >
      {children}
    </Animated.View>
  );
};

export default BottomFABContainer;
