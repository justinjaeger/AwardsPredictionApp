import React from 'react';
import useDevice from '../../util/device';
import Trophy from '../../assets/awardsBodies/trophy_color.png';
import TrophyWhite from '../../assets/awardsBodies/trophy.png';
import { Image } from 'react-native';
import { AwardsBody } from '../../types/api';

const DEFAULT_SIZE = 60;

const AwardsBodyImage = (props: {
  awardsBody: AwardsBody;
  white?: boolean;
  size?: number;
  style?: any;
}) => {
  const { white, size, style } = props;
  const { isPad } = useDevice();

  const _size = (size || DEFAULT_SIZE) * (isPad ? 1.5 : 1);

  const source = white ? TrophyWhite : Trophy;

  return <Image source={source} style={{ width: _size, height: _size, ...style }} />;
};

export default AwardsBodyImage;
