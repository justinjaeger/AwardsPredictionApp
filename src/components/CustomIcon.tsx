import React from 'react';
import { Icon } from '@ui-kitten/components';

/**
 * https://akveo.github.io/eva-icons/#/
 */

type iCustomIconProps = { name: string; styles?: React.CSSProperties };

const CustomIcon = (props: iCustomIconProps) => {
  const { name, styles } = props;
  return (
    <Icon
      {...props}
      name={name}
      style={{
        width: 32,
        height: 32,
        ...styles,
      }}
    />
  );
};

export default CustomIcon;
