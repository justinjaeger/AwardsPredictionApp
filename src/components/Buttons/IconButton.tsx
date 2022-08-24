import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Button } from '@ui-kitten/components';
import CustomIcon, { iCustomIconProps } from '../CustomIcon';

/**
 * https://akveo.github.io/eva-icons/#/
 */

type iIconButtonProps = {
  onPress: () => void;
  iconProps: iCustomIconProps;
  styles?: StyleProp<ViewStyle>;
};

export const IconButton = (props: iIconButtonProps) => {
  const { onPress, iconProps, styles } = props;
  return (
    <Button
      style={styles || {}}
      appearance="ghost"
      status="danger"
      accessoryLeft={() => <CustomIcon {...iconProps} />}
      onPress={onPress}
    />
  );
};
