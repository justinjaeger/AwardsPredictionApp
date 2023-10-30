import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import ActionButton from './ActionButton';

type iFABProps = {
  iconName?: string;
  text?: string;
  onPress: () => void;
  visible?: boolean;
  bottomPercentage?: string;
  horizontalOffset?: number;
};

export const FAB = ({
  iconName,
  text,
  onPress,
  visible,
  bottomPercentage,
  horizontalOffset,
}: iFABProps) => {
  const buttonX = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  const toValue = -(horizontalOffset || 0);

  useEffect(() => {
    Animated.timing(buttonX, {
      toValue: visible ? toValue : 100,
      duration: 250,
      useNativeDriver: false,
    }).start();
    Animated.timing(buttonOpacity, {
      toValue: visible ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [visible]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: bottomPercentage || '1%',
        alignSelf: 'flex-end',
        transform: [{ translateX: buttonX }],
        opacity: buttonOpacity,
      }}
    >
      <ActionButton iconName={iconName} text={text} onPress={onPress} />
    </Animated.View>
  );
};
