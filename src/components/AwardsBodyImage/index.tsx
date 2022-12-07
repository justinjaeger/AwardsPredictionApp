import React from 'react';
import { Image } from 'react-native';
import { AwardsBody } from '../../API';
import { AWARDS_BODY_TO_IMAGE } from '../../constants/awardsBodies';

const DEFAULT_SIZE = 60;

const AwardsBodyImage = (props: { awardsBody: AwardsBody; size?: 20; style?: any }) => {
  const { awardsBody, size, style } = props;
  const _size = size || DEFAULT_SIZE;

  const source = AWARDS_BODY_TO_IMAGE[awardsBody];

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
