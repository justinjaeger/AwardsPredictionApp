import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import ActionButton from './ActionButton';

const LEFT_OFFSET = 100;

type iFABProps = {
  iconName?: string;
  text?: string;
  onPress: () => void;
  visible?: boolean;
  bottomPercentage?: string;
  horizontalOffset?: number;
  left?: boolean;
  isLoading?: boolean;
  bottom?: number;
};

export const FAB = ({
  iconName,
  text,
  onPress,
  visible,
  bottomPercentage,
  horizontalOffset = 0,
  left,
  isLoading,
  bottom,
}: iFABProps) => {
  const buttonX = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  const toValue = left ? horizontalOffset ?? 0 : -(horizontalOffset ?? 0);

  useEffect(() => {
    Animated.timing(buttonX, {
      toValue: left
        ? visible
          ? LEFT_OFFSET + horizontalOffset
          : toValue
        : visible
        ? toValue
        : LEFT_OFFSET,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(buttonOpacity, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: bottom || bottomPercentage || 10,
        transform: [{ translateX: buttonX }],
        opacity: buttonOpacity,
        left: left ? -LEFT_OFFSET : undefined,
        right: left ? undefined : horizontalOffset,
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
