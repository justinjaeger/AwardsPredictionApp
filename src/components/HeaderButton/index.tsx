import React from 'react';
import theme from '../../constants/theme';
import { IconButtonCustom, IconButtonOutlined } from '../Buttons/IconButton';

const HeaderButton = (props: {
  icon?: string;
  onPress: () => void;
  style?: any;
  customIcon?: JSX.Element;
}) => {
  const { icon, onPress, customIcon, style } = props;
  if (customIcon) {
    return (
      <IconButtonCustom
        onPress={onPress}
        customIcon={customIcon}
        styles={{
          width: 40,
          height: 40,
          marginRight: theme.posterMargin,
          marginLeft: theme.posterMargin,
          ...style,
        }}
      />
    );
  }
  if (icon) {
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
  }
  return null;
};

export default HeaderButton;
