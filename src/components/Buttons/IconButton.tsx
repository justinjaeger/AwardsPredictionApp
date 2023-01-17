import React from 'react';
import { StyleProp, TouchableHighlight, ViewStyle } from 'react-native';
import CustomIcon, { iCustomIconProps } from '../CustomIcon';
import theme from '../../constants/theme';
import COLORS from '../../constants/colors';

/**
 * https://akveo.github.io/eva-icons/#/
 */

type iIconButtonProps = {
  onPress: () => void;
  iconProps: iCustomIconProps;
  color?: string;
  enableOnPressIn?: boolean;
  styles?: any;
};

const SIZE = 30;

export const IconButton = (props: iIconButtonProps) => {
  const { onPress, iconProps, color, enableOnPressIn, styles } = props;
  return (
    <TouchableHighlight
      style={{
        borderRadius: theme.borderRadius,
        ...styles,
      }}
      underlayColor={COLORS.secondary}
      onPress={onPress}
      onPressIn={enableOnPressIn ? onPress : undefined}
    >
      <CustomIcon
        {...iconProps}
        color={color || COLORS.white}
        styles={{ borderRadius: 100 }}
      />
    </TouchableHighlight>
  );
};

export const IconButtonOutlined = (props: iIconButtonProps) => {
  const { onPress, iconProps, styles } = props;
  return (
    <TouchableHighlight
      style={{
        borderRadius: theme.borderRadius,
        backgroundColor: COLORS.primaryLight,
        height: SIZE + 5,
        width: SIZE + 5,
        alignItems: 'center',
        justifyContent: 'center',
        // @ts-ignore
        ...styles,
      }}
      underlayColor={COLORS.secondaryDark}
      onPress={onPress}
    >
      <CustomIcon {...iconProps} size={24} styles={{ borderRadius: 100, top: 1 }} />
    </TouchableHighlight>
  );
};

export const IconButtonCustom = (props: {
  onPress: () => void;
  styles?: StyleProp<ViewStyle>;
  customIcon: JSX.Element;
}) => {
  const { onPress, customIcon, styles } = props;
  return (
    <TouchableHighlight
      style={{
        borderRadius: theme.borderRadius,
        backgroundColor: COLORS.primaryLight,
        height: SIZE + 5,
        width: SIZE + 5,
        alignItems: 'center',
        justifyContent: 'center',
        // @ts-ignore
        ...styles,
      }}
      underlayColor={COLORS.secondaryDark}
      onPress={onPress}
    >
      {customIcon}
    </TouchableHighlight>
  );
};
