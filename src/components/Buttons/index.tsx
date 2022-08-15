import React from 'react';
import { Button } from '@ui-kitten/components';

interface iButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  style?: any;
}

export const SubmitButton = (props: iButtonProps) => (
  <Button
    onPress={props.onPress}
    status="primary"
    size="giant"
    disabled={props.disabled}
    style={{ marginTop: 40, ...props.style }}
  >
    {props.text}
  </Button>
);

export const TouchableText = (props: iButtonProps) => (
  <Button
    onPress={props.onPress}
    status="primary"
    size="small"
    disabled={props.disabled}
    appearance={'ghost'}
    style={props.style}
  >
    {props.text}
  </Button>
);
