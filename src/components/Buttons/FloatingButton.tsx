import React from 'react';
import { TouchableHighlight } from 'react-native';
import COLORS from '../../constants/colors';
import CustomIcon from '../CustomIcon';

const SIZE = 50;

/**
 * https://akveo.github.io/eva-icons/#/
 */

const FloatingButton = (props: {
  icon?: string;
  onPress: () => void;
  style?: any;
  customIcon?: JSX.Element;
  disabled?: boolean;
}) => {
  const { icon, onPress, customIcon, disabled, style } = props;
  const iconProps = icon
    ? {
        name: icon,
      }
    : undefined;

  return (
    <TouchableHighlight
      style={{
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE,
        backgroundColor: disabled ? COLORS.disabled : COLORS.secondaryDark,
        borderWidth: 2,
        borderColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      underlayColor={disabled ? COLORS.disabled : COLORS.secondary}
      onPress={onPress}
    >
      {customIcon ||
        (iconProps ? (
          <CustomIcon
            {...iconProps}
            color={COLORS.white}
            styles={{ borderRadius: 100 }}
          />
        ) : null)}
    </TouchableHighlight>
  );
};

export default FloatingButton;
