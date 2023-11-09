import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import useDevice from '../../util/device';
import FloatingButton from './FloatingButton';

const BOTTOM = 80;

const displayStyle: StyleProp<ViewStyle> = {
  position: 'absolute',
  zIndex: 10,
  bottom: BOTTOM,
  right: 10,
};

export const ScreenshotFab = ({
  onPress,
  positionFromBottom,
}: {
  onPress: () => void;
  positionFromBottom?: number;
}) => {
  return (
    <View style={[displayStyle, { bottom: positionFromBottom ?? 50 }]}>
      <FloatingButton onPress={() => onPress()} icon={'grid'} />
    </View>
  );
};

export const AddPredictionsFab = ({
  onPress,
  positionFromBottom,
  positionFromRight,
}: {
  onPress: () => void;
  positionFromBottom?: number;
  positionFromRight?: number;
}) => {
  const { isPad } = useDevice();

  return (
    <View
      style={[
        displayStyle,
        {
          bottom: positionFromBottom ?? BOTTOM * 1.7 * (isPad ? 1.5 : 1),
          right: positionFromRight ?? 10,
        },
      ]}
    >
      <FloatingButton onPress={onPress} icon={'plus'} />
    </View>
  );
};
