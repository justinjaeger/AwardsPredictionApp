import React from 'react';
import { AwardsBody } from '../../API';
import useDevice from '../../util/device';
import Trophy from '../../assets/awardsBodies/trophy.svg';
import TrophyWhite from '../../assets/awardsBodies/trophy_white.svg';

const DEFAULT_SIZE = 60;

const AwardsBodyImage = (props: {
  awardsBody: AwardsBody;
  white?: boolean;
  size?: number;
  style?: any;
}) => {
  const { white, size } = props;
  const { isPad } = useDevice();

  const _size = (size || DEFAULT_SIZE) * (isPad ? 1.5 : 1);

  return white ? (
    <TrophyWhite width={_size} height={_size} />
  ) : (
    <Trophy width={_size} height={_size} />
  );

  //   const source = white
  //     ? AWARDS_BODY_TO_IMAGE_WHITE[awardsBody]
  //     : AWARDS_BODY_TO_IMAGE[awardsBody];

  //   return (
  //     <Image
  //       source={source}
  //       width={_size}
  //       height={_size}
  //       style={{ width: _size, height: _size, ...style }}
  //     />
  //   );
};

export default AwardsBodyImage;
