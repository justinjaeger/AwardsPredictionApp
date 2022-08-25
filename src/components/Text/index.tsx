import React from 'react';
import { Text } from '@ui-kitten/components';
import { StyleProp, TextStyle } from 'react-native';

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
    <Text category={'h6'} style={props.style}>
      {props.children}
    </Text>
  );
};

export const Body = (props: iTextProps) => {
  return (
    <Text category={'p2'} style={props.style}>
      {props.children}
    </Text>
  );
};

export const BodyLarge = (props: iTextProps) => {
  return (
    <Text category={'p1'} style={props.style}>
      {props.children}
    </Text>
  );
};
