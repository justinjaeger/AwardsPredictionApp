import React from 'react';
import { Icon } from '@ui-kitten/components';
import COLORS from '../constants/colors';
import useDevice from '../util/device';

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
  const { isPad } = useDevice();

  const s = (size || 36) * (isPad ? 1.2 : 1);
  return (
    <Icon
      {...props}
      name={name}
      style={{
        width: s,
        height: s,
        ...styles,
      }}
      fill={color || COLORS.white}
    />
  );
};

export default CustomIcon;
