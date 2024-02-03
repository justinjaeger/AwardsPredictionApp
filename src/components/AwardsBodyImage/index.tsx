import React from 'react';
import useDevice from '../../util/device';
import Trophy from '../../assets/awardsBodies/trophy_color.png';
import TrophyWhite from '../../assets/awardsBodies/trophy.png';
import { Image } from 'react-native';
import { AwardsBody } from '../../models';

const DEFAULT_SIZE = 60;

const AwardsBodyImage = (props: {
  awardsBody: AwardsBody;
  white?: boolean;
  size?: number;
  style?: any;
  disablePadResize?: boolean;
}) => {
  const { white, size, style, disablePadResize } = props;
  const { isPad } = useDevice();

  const _size = (size || DEFAULT_SIZE) * (isPad && !disablePadResize ? 1.5 : 1);

  const source = white ? TrophyWhite : Trophy;

  return <Image source={source} style={{ width: _size, height: _size, ...style }} />;
};

export default AwardsBodyImage;
