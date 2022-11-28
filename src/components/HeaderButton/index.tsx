import React from 'react';
import theme from '../../constants/theme';
import { IconButtonOutlined } from '../Buttons/IconButton';

const HeaderButton = (props: { icon: string; onPress: () => void; style?: any }) => {
  const { icon, onPress, style } = props;
  return (
    <IconButtonOutlined
      onPress={onPress}
      iconProps={{
        name: icon,
      }}
      styles={{
        width: 40,
        height: 40,
        marginRight: theme.posterMargin,
        marginLeft: theme.posterMargin,
        ...style,
      }}
    />
  );
};

export default HeaderButton;
