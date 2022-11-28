import React from 'react';
import { Text } from '@ui-kitten/components';
import { StyleProp, TextStyle } from 'react-native';
import COLORS from '../../constants/colors';

interface iTextProps {
  children: string;
  style?: StyleProp<TextStyle>;
}

export const Header = (props: iTextProps) => {
  return (
    <Text category={'h1'} style={props.style}>
      {props.children}
    </Text>
  );
};

export const SubHeader = (props: iTextProps) => {
  return (
    <Text
      category={'h6'}
      style={{
        fontWeight: '700',
        color: COLORS.lightest,
        // @ts-ignore
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

export const Label = (props: iTextProps) => {
  return (
    <Text
      category={'label'}
      style={{
        fontWeight: '400',
        color: COLORS.lightest,
        // @ts-ignore
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

export const LabelBold = (props: iTextProps) => {
  return (
    <Text
      category={'label'}
      style={{
        fontWeight: '700',
        color: COLORS.lightest,
        // @ts-ignore
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

export const Body = (props: iTextProps) => {
  return (
    <Text
      category={'p1'}
      style={{
        fontWeight: '400',
        color: COLORS.lightest,
        // @ts-ignore
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

export const BodyLarge = (props: iTextProps) => {
  return (
    <Text
      category={'p1'}
      style={{
        fontWeight: '700',
        color: COLORS.lightest,
        // @ts-ignore
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};
