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
}) => {
  const { icon, onPress, customIcon, style } = props;
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
        backgroundColor: COLORS.secondaryDark,
        borderWidth: 2,
        borderColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      underlayColor={COLORS.secondary}
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
