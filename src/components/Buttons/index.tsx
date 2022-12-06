import React from 'react';
import { Spinner } from '@ui-kitten/components';
import COLORS from '../../constants/colors';
import { TouchableHighlight, TouchableOpacity } from 'react-native';
import { BodyLarge } from '../Text';
import theme from '../../constants/theme';

interface iButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: any;
}

export const SubmitButton = (props: iButtonProps) => (
  <TouchableHighlight
    onPress={props.onPress}
    disabled={props.disabled || props.loading}
    style={{
      width: '50%',
      alignSelf: 'center',
      backgroundColor: props.disabled ? COLORS.disabled : COLORS.goldDark,
      padding: 20,
      borderRadius: theme.borderRadius,
      ...props.style,
    }}
    underlayColor={COLORS.secondary}
  >
    <>
      {props.loading ? (
        () => <Spinner size="medium" status="control" />
      ) : (
        <BodyLarge
          style={{
            textAlign: 'center',
            color: props.disabled ? COLORS.disabledText : COLORS.white,
          }}
        >
          {props.text}
        </BodyLarge>
      )}
    </>
  </TouchableHighlight>
);

export const TouchableText = (props: iButtonProps) => (
  <TouchableOpacity
    onPress={props.onPress}
    disabled={props.disabled}
    style={{
      fontWeight: '400',
      color: COLORS.lightest,
      ...props.style,
    }}
  >
    <BodyLarge
      style={{
        color: COLORS.secondary,
        textAlign: 'center',
      }}
    >
      {props.text}
    </BodyLarge>
  </TouchableOpacity>
);
