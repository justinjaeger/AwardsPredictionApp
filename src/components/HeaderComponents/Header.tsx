import { StyleProp, View, ViewStyle } from 'react-native';
import { HeaderLight } from '../Text';
import React from 'react';

export const HEADER_HEIGHT = 40;

const Header = ({ text, style }: { text: string; style?: StyleProp<ViewStyle> }) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          height: HEADER_HEIGHT,
        },
        style,
      ]}
    >
      <HeaderLight>{text}</HeaderLight>
    </View>
  );
};

export default Header;
