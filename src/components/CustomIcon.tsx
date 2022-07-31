import React from 'react';
import { Icon } from '@ui-kitten/components';
import theme from '../theme';

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
        width: size || 32,
        height: size || 32,
        ...styles,
      }}
      fill={color || theme['color-primary-900']}
    />
  );
};

export default CustomIcon;
