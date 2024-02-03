import React from 'react';
import { SmallHeader, SubHeaderLight } from '../Text';
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
      <SmallHeader style={{ overflow: 'visible' }} numberOfLines={1}>
        {number.toString()}
      </SmallHeader>
      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        <SubHeaderLight style={{ textAlign: 'center' }}>{text}</SubHeaderLight>
      </View>
    </View>
  );
};

export default Stat;
