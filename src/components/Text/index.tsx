import React from 'react';
import { Text } from '@ui-kitten/components';

interface iTextProps {
  children: string;
}

export const Header = (props: iTextProps) => {
  return <Text category={'h1'}>{props.children}</Text>;
};

export const Body = (props: iTextProps) => {
  return <Text category={'p2'}>{props.children}</Text>;
};
