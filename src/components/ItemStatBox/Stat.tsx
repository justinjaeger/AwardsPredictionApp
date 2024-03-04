import React from 'react';
import { HeaderLight, SubHeaderLight } from '../Text';
import { View } from 'react-native';

const Stat = ({ number, text }: { number: string; text: string }) => {
  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        overflow: 'visible',
      }}
    >
      <HeaderLight style={{ overflow: 'visible' }} numberOfLines={1}>
        {number.toString()}
      </HeaderLight>
      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        <SubHeaderLight style={{ textAlign: 'center' }}>{text}</SubHeaderLight>
      </View>
    </View>
  );
};

export default Stat;
