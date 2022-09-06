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

const SIZE = 30;

export const IconButton = (props: iIconButtonProps) => {
  const { onPress, iconProps, styles } = props;
  return (
    <Button
      style={
        styles || {
          borderRadius: SIZE,
          height: SIZE,
          width: SIZE,
        }
      }
      appearance="ghost"
      status="danger"
      accessoryLeft={() => <CustomIcon {...iconProps} styles={{ borderRadius: 100 }} />}
      onPress={onPress}
    />
  );
};
