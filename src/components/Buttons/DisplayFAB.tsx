import React, { useEffect } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useDisplayState } from '../../context/DisplayStateContext';
import useDevice from '../../util/device';
import FloatingButton from './FloatingButton';

const BOTTOM = 80;

const displayStyle: StyleProp<ViewStyle> = {
  position: 'absolute',
  zIndex: 10,
  bottom: BOTTOM,
  right: 10,
};

export const EventDisplayFab = () => {
  const { eventDisplayState, toggleEventDisplay } = useDisplayState();
  const { isPad } = useDevice();
  return (
    <View style={[displayStyle, { bottom: BOTTOM * (isPad ? 1.5 : 1) }]}>
      <FloatingButton
        onPress={toggleEventDisplay}
        icon={eventDisplayState === 'default' ? 'collapse' : 'grid'}
      />
    </View>
  );
};

export const CategoryDisplayFab = ({ skipGrid }: { skipGrid?: boolean }) => {
  const { categoryDisplayState, toggleCategoriesDisplay } = useDisplayState();
  const { isPad } = useDevice();

  useEffect(() => {
    if (skipGrid && categoryDisplayState === 'grid') {
      toggleCategoriesDisplay(true);
    }
  }, [categoryDisplayState]);

  return (
    <View style={[displayStyle, { bottom: BOTTOM * (isPad ? 1.5 : 1) }]}>
      <FloatingButton
        onPress={() => toggleCategoriesDisplay(skipGrid)}
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

export const AddPredictionsFab = ({ onPress }: { onPress: () => void }) => {
  const { isPad } = useDevice();

  return (
    <View style={[displayStyle, { bottom: BOTTOM * 1.7 * (isPad ? 1.5 : 1) }]}>
      <FloatingButton onPress={onPress} icon={'plus'} />
    </View>
  );
};
