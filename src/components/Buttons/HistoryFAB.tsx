import React from 'react';
import { View } from 'react-native';
import { useCategory } from '../../context/CategoryContext';
import FloatingButton from './FloatingButton';

const HistoryFAB = () => {
  const { date, setDate } = useCategory();
  const isHistory = !!date;

  const onTouchClock = () => {
    if (!isHistory) {
      setDate(new Date());
    }
  };

  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 10,
        bottom: 80,
        right: 10,
        flexDirection: 'row',
      }}
    >
      <FloatingButton
        onPress={isHistory ? () => {} : onTouchClock}
        icon={'clock-outline'}
        disabled={isHistory}
      />
    </View>
  );
};

export default HistoryFAB;
