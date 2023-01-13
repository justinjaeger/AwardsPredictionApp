import React from 'react';
import { View } from 'react-native';
import FloatingButton from './FloatingButton';

const DisplayFAB = ({
  state,
  toggleDisplay,
}: {
  state: 'list' | 'list-collapsed' | 'grid';
  toggleDisplay: () => void;
}) => {
  return (
    <View style={{ position: 'absolute', zIndex: 10, bottom: 100, right: 10 }}>
      <FloatingButton
        onPress={toggleDisplay}
        icon={
          state === 'list-collapsed' ? 'expand' : state === 'list' ? 'collapse' : 'grid'
        }
      />
    </View>
  );
};

export default DisplayFAB;
