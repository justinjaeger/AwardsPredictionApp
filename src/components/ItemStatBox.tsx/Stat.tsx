import React from 'react';
import { Header, SubHeaderLight } from '../Text';
import { View } from 'react-native';

const Stat = ({ number, text }: { number: string; text: string }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Header>{number.toString()}</Header>
      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        <SubHeaderLight style={{ marginLeft: 5 }}>{text}</SubHeaderLight>
      </View>
    </View>
  );
};

export default Stat;
