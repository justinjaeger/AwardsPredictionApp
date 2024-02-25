import { View } from 'react-native';
import { HeaderLight } from '../Text';
import React from 'react';

export const SUBHEADER_HEIGHT = 30;

const Subheader = ({ text }: { text: string }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: SUBHEADER_HEIGHT,
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

export default Subheader;
