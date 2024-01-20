import React from 'react';
import { Header, SubHeaderLight } from '../Text';
import { View } from 'react-native';

const Stat = ({ number, text }: { number: string; text: string }) => {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Header>{number.toString()}</Header>
      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        <SubHeaderLight style={{ textAlign: 'center' }}>{text}</SubHeaderLight>
      </View>
    </View>
  );
};

export default Stat;
