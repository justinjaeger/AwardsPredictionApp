import { View } from 'react-native';
import { HeaderLight } from '../Text';
import React from 'react';

export const HEADER_HEIGHT = 40;

const Header = ({ text }: { text: string }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: HEADER_HEIGHT,
      }}
    >
      <HeaderLight>{text}</HeaderLight>
    </View>
  );
};

export default Header;
