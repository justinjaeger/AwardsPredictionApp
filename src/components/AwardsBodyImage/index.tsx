import React from 'react';
import { Image } from 'react-native';

const DEFAULT_SIZE = 60;

const AwardsBodyImage = (props: { source: any; size?: 20; style?: any }) => {
  const { source, size, style } = props;
  const _size = size || DEFAULT_SIZE;
  return (
    <Image
      source={source}
      width={_size}
      height={_size}
      style={{ width: _size, height: _size, ...style }}
    />
  );
};

export default AwardsBodyImage;
