import React from 'react';
import { Animated, View } from 'react-native';
import { BOTTOM_TAB_HEIGHT } from '../../constants';

const BottomFABContainer = ({
  children,
  bottom: _bottom,
}: {
  children?: React.ReactNode;
  bottom?: number;
}) => {
  const bottom = _bottom || BOTTOM_TAB_HEIGHT;
  return (
    <Animated.View style={{ zIndex: 10 }}>
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
