import React from 'react';
import { Text } from '@ui-kitten/components';
import { StyleProp, TextStyle } from 'react-native';
import COLORS from '../../constants/colors';

interface iTextProps {
  children: string;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
}

export const Header = (props: iTextProps) => {
  return (
    <Text
      category={'h4'}
      style={[
        {
          fontWeight: '700',
          color: COLORS.lightest,
        },
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
};

export const HeaderLight = (props: iTextProps) => {
  return (
    <Text
      category={'h5'}
      style={[
        {
          fontWeight: '700',
          color: COLORS.lightest,
        },
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
};

export const SubHeader = (props: iTextProps) => {
  return (
    <Text
      category={'p1'}
      style={[
        {
          fontWeight: '700',
          color: COLORS.lightest,
        },
        props.style,
      ]}
      numberOfLines={props.numberOfLines}
    >
      {props.children}
    </Text>
  );
};

export const SubHeaderLight = (props: iTextProps) => {
  return (
    <Text
      category={'p1'}
      style={[
        {
          fontWeight: '400',
          color: COLORS.lightest,
        },
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
};

export const Body = (props: iTextProps) => {
  return (
    <Text
      category={'label'}
      style={[
        {
          fontWeight: '400',
          color: COLORS.lightest,
        },
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
};

export const BodyBold = (props: iTextProps) => {
  return (
    <Text
      category={'label'}
      style={[
        {
          fontWeight: '700',
          color: COLORS.lightest,
        },
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
};
