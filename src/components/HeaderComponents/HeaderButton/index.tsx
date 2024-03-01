import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import React from 'react';
import CustomIcon from '../../CustomIcon';
import COLORS from '../../../constants/colors';

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
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('FUK');
        onPress();
      }}
      style={{
        width: HEADER_BUTTON_HEIGHT,
        height: HEADER_BUTTON_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
      }}
    >
      <View
        style={[
          {
            width: HEADER_BUTTON_HEIGHT - 10,
            height: HEADER_BUTTON_HEIGHT - 10,
            backgroundColor:
              variation === 'transparent' ? 'transparent' : COLORS.primaryLight,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
          },
          style,
        ]}
      >
        <CustomIcon name={icon} size={HEADER_BUTTON_HEIGHT - 15} color={COLORS.white} />
      </View>
    </TouchableOpacity>
  );
};

export default HeaderButton;
