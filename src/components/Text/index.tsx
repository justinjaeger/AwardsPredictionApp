import React from 'react';
import { Text } from '@ui-kitten/components';
import { StyleProp, TextStyle } from 'react-native';
import COLORS from '../../constants/colors';
import useDevice from '../../util/device';

interface iTextProps {
  children: string;
  style?: StyleProp<TextStyle>;
}

export const Header = (props: iTextProps) => {
  const { isLargeScreen, isSmallScreen } = useDevice();
  return (
    <Text
      category={isLargeScreen ? 'h3' : isSmallScreen ? 'h4' : 'h5'}
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

export const SmallHeader = (props: iTextProps) => {
  const { isLargeScreen, isSmallScreen } = useDevice();
  return (
    <Text
      category={isLargeScreen ? 'h4' : isSmallScreen ? 'h5' : 'h6'}
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
  const { isLargeScreen, isSmallScreen } = useDevice();
  return (
    <Text
      category={isLargeScreen ? 'h4' : isSmallScreen ? 'p1' : 'h6'}
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

export const SubHeaderLight = (props: iTextProps) => {
  const { isLargeScreen, isSmallScreen } = useDevice();
  return (
    <Text
      category={isLargeScreen ? 'h4' : isSmallScreen ? 'p1' : 'h6'}
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

export const HeaderLight = (props: iTextProps) => {
  const { isLargeScreen, isSmallScreen } = useDevice();
  return (
    <Text
      category={isLargeScreen ? 'h2' : isSmallScreen ? 'h5' : 'h4'}
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

export const Body = (props: iTextProps) => {
  const { isLargeScreen, isSmallScreen } = useDevice();

  return (
    <Text
      category={isLargeScreen ? 'h6' : isSmallScreen ? 'label' : 'p1'}
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
  const { isLargeScreen, isSmallScreen } = useDevice();

  return (
    <Text
      category={isLargeScreen ? 'h6' : isSmallScreen ? 'label' : 'p1'}
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

export const Label = (props: iTextProps) => {
  const { isLargeScreen } = useDevice();

  return (
    <Text
      category={isLargeScreen ? 'h6' : 'label'}
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
