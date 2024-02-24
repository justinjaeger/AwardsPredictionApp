import React, { useRef } from 'react';
import { Animated, View } from 'react-native';
import { BOTTOM_TAB_HEIGHT } from '../../constants';
import useDevice from '../../util/device';
import { IPAD_PROFILE_IMAGE_SCALE } from '../ProfileImage';

const BottomFABContainer = ({ children }: { children?: React.ReactNode }) => {
  const { isPad } = useDevice();
  const HEIGHT_TO_MOVE_UP = 60 * (isPad ? IPAD_PROFILE_IMAGE_SCALE : 1);
  const animatedBottomButtons = useRef(new Animated.Value(HEIGHT_TO_MOVE_UP)).current;
  const bottom = BOTTOM_TAB_HEIGHT + (HEIGHT_TO_MOVE_UP - 40);

  return (
    <Animated.View
      style={{
        transform: [{ translateY: animatedBottomButtons }],
        zIndex: 10,
      }}
    >
      <View
        style={{
          position: 'absolute',
          right: 0,
          bottom,
          flexDirection: 'row',
        }}
      >
        {children}
      </View>
    </Animated.View>
  );
};

export default BottomFABContainer;
