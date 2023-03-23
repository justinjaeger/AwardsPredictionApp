import React from 'react';
import { Text } from '@ui-kitten/components';
import { StyleProp, TextStyle } from 'react-native';
import COLORS from '../../constants/colors';
import useDevice from '../../util/device';

interface iTextProps {
  children: string;
  style?: StyleProp<TextStyle>;
}

export const SubHeader = (props: iTextProps) => {
  const { isPad } = useDevice();
  return (
    <Text
      category={isPad ? 'h4' : 'h6'}
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

export const SubHeaderLight = (props: iTextProps) => {
  const { isPad } = useDevice();
  return (
    <Text
      category={isPad ? 'h4' : 'h6'}
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

export const HeaderLight = (props: iTextProps) => {
  const { isPad } = useDevice();
  return (
    <Text
      category={isPad ? 'h2' : 'h4'}
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
  const { isPad } = useDevice();

  return (
    <Text
      category={isPad ? 'h6' : 'p1'}
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

export const BodyBold = (props: iTextProps) => {
  const { isPad } = useDevice();

  return (
    <Text
      category={isPad ? 'h6' : 'p1'}
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
