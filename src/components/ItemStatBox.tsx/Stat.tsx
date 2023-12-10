import React from 'react';
import { formatPercentage } from '../../util/formatPercentage';
import { Header, SubHeaderLight } from '../Text';
import { View } from 'react-native';

const Stat = ({ percentage, text }: { percentage: number; text: string }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Header>{`${formatPercentage(percentage, true)}`}</Header>
      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        <SubHeaderLight style={{ marginLeft: 5 }}>{text}</SubHeaderLight>
      </View>
    </View>
  );
};

export default Stat;
