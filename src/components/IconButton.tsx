import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Button } from '@ui-kitten/components';
import CustomIcon from './CustomIcon';

type iIconButtonProps = {
  iconName: string;
  iconStyles?: React.CSSProperties;
  styles?: StyleProp<ViewStyle>;
};

export const IconButton = (props: iIconButtonProps) => {
  const { iconName, iconStyles, styles } = props;
  return (
    <Button
      style={styles || {}}
      appearance="ghost"
      status="danger"
      accessoryLeft={() => <CustomIcon name={iconName} styles={iconStyles} />}
    />
  );
};
