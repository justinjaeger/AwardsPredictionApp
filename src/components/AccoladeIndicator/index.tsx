import React from 'react';
import { Phase } from '../../types/api';
import { View } from 'react-native';

const AccoladeIndicator = ({ accolade }: { accolade: Phase }) => {
  return (
    <View
      style={{
        backgroundColor:
          accolade === Phase.SHORTLIST
            ? 'goldenrod'
            : accolade === Phase.NOMINATION
            ? 'silver'
            : accolade === Phase.WINNER
            ? 'gold'
            : undefined,
        width: 20,
        height: 20,
        borderRadius: 10,
      }}
    />
  );
};

export default AccoladeIndicator;
