import React, { useEffect, useRef } from 'react';
import { Animated, TouchableHighlight, View } from 'react-native';
import COLORS from '../../constants/colors';
import CustomIcon from '../CustomIcon';
import { SubHeader } from '../Text';

type iFABProps = {
  iconName?: string;
  text?: string;
  onPress: () => void;
  visible?: boolean;
  bottomPercentage?: string;
};

export const FAB = (props: iFABProps) => {
  const { iconName, text, onPress, visible, bottomPercentage } = props;

  const buttonX = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(buttonX, {
      toValue: visible ? 0 : 100,
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
      <TouchableHighlight
        style={{
          backgroundColor: COLORS.primary,
          borderColor: COLORS.white,
          borderWidth: 1,
          borderRadius: 100,
          alignItems: 'center',
          padding: 15,
          margin: 10,
        }}
        onPress={onPress}
        underlayColor={COLORS.goldDark}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {iconName ? (
            <CustomIcon name={iconName} color={COLORS.white} size={24} />
          ) : null}
          {text ? (
            <SubHeader style={{ marginLeft: 5, marginRight: 5 }}>{text}</SubHeader>
          ) : null}
        </View>
      </TouchableHighlight>
    </Animated.View>
  );
};
