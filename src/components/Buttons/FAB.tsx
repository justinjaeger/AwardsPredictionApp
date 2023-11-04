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
  left?: boolean;
  isLoading?: boolean;
};

export const FAB = ({
  iconName,
  text,
  onPress,
  visible,
  bottomPercentage,
  horizontalOffset,
  left,
  isLoading,
}: iFABProps) => {
  const buttonX = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  const toValue = left ? horizontalOffset ?? 0 : -(horizontalOffset ?? 0);

  useEffect(() => {
    Animated.timing(buttonX, {
      toValue: left ? (visible ? 100 : toValue) : visible ? toValue : 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(buttonOpacity, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [visible]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: bottomPercentage || '0%',
        alignSelf: 'flex-end',
        transform: [{ translateX: buttonX }],
        opacity: buttonOpacity,
        left: left ? -100 : undefined,
      }}
    >
      <ActionButton
        iconName={iconName}
        text={text}
        onPress={onPress}
        isLoading={isLoading}
      />
    </Animated.View>
  );
};
