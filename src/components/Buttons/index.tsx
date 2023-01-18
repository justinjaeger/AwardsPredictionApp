import React from 'react';
import { Spinner } from '@ui-kitten/components';
import COLORS from '../../constants/colors';
import { TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { BodyBold } from '../Text';
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
      backgroundColor: props.disabled ? COLORS.disabled : COLORS.secondaryDark,
      borderRadius: theme.borderRadius,
      height: 50,
      paddingLeft: 20,
      paddingRight: 20,
      ...props.style,
    }}
    underlayColor={COLORS.secondary}
  >
    <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      {props.loading ? (
        <Spinner size="medium" style={{ borderColor: COLORS.gray }} />
      ) : (
        <BodyBold
          style={{
            textAlign: 'center',
            color: props.disabled ? COLORS.disabledText : COLORS.white,
          }}
        >
          {props.text}
        </BodyBold>
      )}
    </View>
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
    <BodyBold
      style={{
        color: COLORS.secondary,
        textAlign: 'center',
      }}
    >
      {props.text}
    </BodyBold>
  </TouchableOpacity>
);
