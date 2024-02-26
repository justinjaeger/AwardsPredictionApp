import { View } from 'react-native';
import { SubHeader } from '../Text';
import React from 'react';

export const SUBHEADER_HEIGHT = 30;

const Subheader = ({ text }: { text: string }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'baseline',
        height: SUBHEADER_HEIGHT,
      }}
    >
      <SubHeader style={{ fontWeight: '600' }}>{text}</SubHeader>
    </View>
  );
};

export default Subheader;
