import React from 'react';
import { View } from 'react-native';
import FloatingButton from './FloatingButton';
import PlusMinus from '../../assets/icons/plusMinus.svg';

const AddPredictionsFAB = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={{ position: 'absolute', zIndex: 10, bottom: 160, right: 10 }}>
      <FloatingButton
        onPress={onPress}
        customIcon={<PlusMinus width={24} height={24} />}
      />
    </View>
  );
};

export default AddPredictionsFAB;
