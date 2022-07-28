import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { Text } from '@ui-kitten/components';

const Header = (props: StackHeaderProps) => {
  const { title } = props.scene.descriptor.options;

  // TODO: add back icon

  return (
    <>
      <Text>{`I am a header: ${title}`}</Text>
    </>
  );
};

export default Header;
