import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { Text } from '@ui-kitten/components';
import { IconButton } from '../IconButton';

const Header = (props: StackHeaderProps) => {
  const { title } = props.scene.descriptor.options;

  return (
    <>
      <IconButton iconName={'arrow-ios-back-outline'} />
      <Text>{`I am a header: ${title}`}</Text>
    </>
  );
};

export default Header;
