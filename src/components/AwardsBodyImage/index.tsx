import React from 'react';
import { Image } from 'react-native';
import { AwardsBody } from '../../API';
import {
  AWARDS_BODY_TO_IMAGE,
  AWARDS_BODY_TO_IMAGE_WHITE,
} from '../../constants/awardsBodies';

const DEFAULT_SIZE = 60;

const AwardsBodyImage = (props: {
  awardsBody: AwardsBody;
  white?: boolean;
  size?: number;
  style?: any;
}) => {
  const { awardsBody, white, size, style } = props;
  const _size = size || DEFAULT_SIZE;

  const source = white
    ? AWARDS_BODY_TO_IMAGE_WHITE[awardsBody]
    : AWARDS_BODY_TO_IMAGE[awardsBody];

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
