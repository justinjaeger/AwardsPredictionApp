import React from 'react';
import { View } from 'react-native';
import FloatingButton from './FloatingButton';

const DisplayFAB = ({
  isCollapsed,
  toggleCollapsed,
}: {
  isCollapsed: boolean;
  toggleCollapsed: () => void;
}) => {
  return (
    <View style={{ position: 'absolute', zIndex: 10, bottom: 100, right: 10 }}>
      <FloatingButton
        onPress={toggleCollapsed}
        icon={isCollapsed ? 'expand' : 'collapse'}
      />
    </View>
  );
};

export default DisplayFAB;
