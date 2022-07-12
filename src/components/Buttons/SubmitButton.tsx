import React from 'react';
import { Button } from '@ui-kitten/components';

interface iButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
}

export const SubmitButton = (props: iButtonProps) => (
  <Button
    onPress={props.onPress}
    status="primary"
    size="giant"
    disabled={props.disabled}
    style={{ marginTop: 40 }}
  >
    {props.text}
  </Button>
);
