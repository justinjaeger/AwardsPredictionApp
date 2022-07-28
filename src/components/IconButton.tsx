import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Button } from '@ui-kitten/components';
import CustomIcon from './CustomIcon';

/**
 * https://akveo.github.io/eva-icons/#/
 */

type iIconButtonProps = {
  iconName: string;
  onPress: () => void;
  iconStyles?: React.CSSProperties;
  styles?: StyleProp<ViewStyle>;
};

export const IconButton = (props: iIconButtonProps) => {
  const { iconName, onPress, iconStyles, styles } = props;
  return (
    <Button
      style={styles || {}}
      appearance="ghost"
      status="danger"
      accessoryLeft={() => <CustomIcon name={iconName} styles={iconStyles} />}
      onPress={onPress}
    />
  );
};
