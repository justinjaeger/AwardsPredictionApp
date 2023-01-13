import React from 'react';
import { Icon } from '@ui-kitten/components';
import COLORS from '../constants/colors';

/**
 * https://akveo.github.io/eva-icons/#/
 */

export type iCustomIconProps = {
  name: string;
  color?: string;
  size?: number;
  styles?: React.CSSProperties;
};

const CustomIcon = (props: iCustomIconProps) => {
  const { name, size, color, styles } = props;
  return (
    <Icon
      {...props}
      name={name}
      style={{
        width: size || 36,
        height: size || 36,
        ...styles,
      }}
      fill={color || COLORS.white}
    />
  );
};

export default CustomIcon;
