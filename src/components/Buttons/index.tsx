import React from 'react';
import { Button, Spinner } from '@ui-kitten/components';
import COLORS from '../../constants/colors';
import { TouchableOpacity } from 'react-native';
import { Label } from '../Text';

interface iButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: any;
}

export const SubmitButton = (props: iButtonProps) => (
  <Button
    onPress={props.onPress}
    status="primary"
    size="giant"
    disabled={props.disabled || props.loading}
    style={{ ...props.style }}
  >
    {props.loading ? () => <Spinner size="medium" status="control" /> : props.text}
  </Button>
);

export const SmallButton = (props: iButtonProps) => (
  <Button
    onPress={props.onPress}
    status="primary"
    size="small"
    disabled={props.disabled || props.loading}
    style={{ ...props.style }}
  >
    {props.loading ? () => <Spinner size="medium" status="control" /> : props.text}
  </Button>
);

export const TouchableText = (props: iButtonProps) => (
  <TouchableOpacity
    onPress={props.onPress}
    // status="primary"
    // size="small"
    disabled={props.disabled}
    // appearance={'ghost'}
    style={{
      fontWeight: '400',
      color: COLORS.lightest,
      // @ts-ignore
      ...props.style,
    }}
  >
    <Label
      style={{
        // textDecorationLine: 'underline',
        color: COLORS.secondary,
      }}
    >
      {props.text}
    </Label>
  </TouchableOpacity>
);
