import React from 'react';
import { formatPercentage } from '../../util/formatPercentage';
import { Header, SubHeaderLight } from '../Text';
import { View } from 'react-native';

const Stat = ({
  percentage,
  subject,
}: {
  percentage: number;
  subject: 'nom' | 'win' | 'listed';
}) => {
  const subjectText = subject === 'nom' ? 'nom' : subject === 'win' ? 'win' : 'list';
  return (
    <View style={{ alignItems: 'center' }}>
      <Header>{`${formatPercentage(percentage, true)}`}</Header>
      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        <SubHeaderLight style={{ marginLeft: 5 }}>
          {'predict ' + subjectText}
        </SubHeaderLight>
      </View>
    </View>
  );
};

export default Stat;
