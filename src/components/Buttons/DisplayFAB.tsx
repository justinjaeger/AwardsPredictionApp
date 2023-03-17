import React from 'react';
import { View } from 'react-native';
import { useDisplayState } from '../../context/DisplayStateContext';
import FloatingButton from './FloatingButton';

export const EventDisplayFab = () => {
  const { eventDisplayState, toggleEventDisplay } = useDisplayState();
  return (
    <View style={{ position: 'absolute', zIndex: 10, bottom: 80, right: 10 }}>
      <FloatingButton
        onPress={toggleEventDisplay}
        icon={eventDisplayState === 'default' ? 'collapse' : 'grid'}
      />
    </View>
  );
};

export const CategoryDisplayFab = () => {
  const { categoryDisplayState, toggleCategoriesDisplay } = useDisplayState();
  return (
    <View style={{ position: 'absolute', zIndex: 10, bottom: 80, right: 10 }}>
      <FloatingButton
        onPress={toggleCategoriesDisplay}
        icon={
          categoryDisplayState === 'list-collapsed'
            ? 'grid'
            : categoryDisplayState === 'list'
            ? 'collapse'
            : 'list'
        }
      />
    </View>
  );
};
