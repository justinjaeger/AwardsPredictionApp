import React from 'react';
import { toDateString } from '../../util/toDateString';
import { yyyymmddToDate } from '../../util/yyyymmddToDate';
import { SubHeader } from '../Text';
import { StyleProp, View, ViewStyle } from 'react-native';
import CustomIcon from '../CustomIcon';

const HistoryDateIndicator = ({
  yyyymmdd,
  style,
}: {
  yyyymmdd: number;
  style?: StyleProp<ViewStyle>;
}) => {
  if (!yyyymmdd) return null;
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.07)',
          padding: 5,
        },
        style,
      ]}
    >
      <CustomIcon name={'clock-outline'} size={24} />
      <SubHeader style={{ padding: 10, textAlign: 'center' }}>
        {toDateString(yyyymmddToDate(yyyymmdd))}
      </SubHeader>
    </View>
  );
};

export default HistoryDateIndicator;
