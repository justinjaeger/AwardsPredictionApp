import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import React from 'react';
import CustomIcon from '../../CustomIcon';
import COLORS from '../../../constants/colors';
import useDevice from '../../../util/device';

export const HEADER_BUTTON_HEIGHT = 40;

const HeaderButton = ({
  onPress,
  icon,
  style,
  variation = 'transparent',
}: {
  onPress: () => void;
  icon: string;
  style?: StyleProp<ViewStyle>;
  variation?: 'transparent' | 'on-dark';
}) => {
  const { isPad } = useDevice();
  const height = HEADER_BUTTON_HEIGHT * (isPad ? 1.25 : 1);
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={{
        width: height,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
      }}
    >
      <View
        style={[
          {
            width: height - 10,
            height: height - 10,
            backgroundColor:
              variation === 'transparent' ? 'transparent' : COLORS.primaryLight,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          },
          style,
        ]}
      >
        <CustomIcon name={icon} size={height - 10} color={COLORS.white} />
      </View>
    </TouchableOpacity>
  );
};

export default HeaderButton;
