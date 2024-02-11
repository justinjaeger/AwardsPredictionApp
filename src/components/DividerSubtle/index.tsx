import React from 'react';
import { View } from 'react-native';
import COLORS from '../../constants/colors';

export const DividerSubtle = () => (
  <View
    style={{
      height: 0.5,
      width: '90%',
      backgroundColor: COLORS.primaryLight,
      marginTop: 10,
      alignSelf: 'center',
    }}
  />
);
