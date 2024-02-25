import { View } from 'react-native';
import { HeaderLight } from '../Text';
import React from 'react';

export const HEADER_HEIGHT = 40;

const Header = ({ text }: { text: string }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: HEADER_HEIGHT,
      }}
    >
      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <HeaderLight>{text}</HeaderLight>
      </View>
    </View>
  );
};

export default Header;
