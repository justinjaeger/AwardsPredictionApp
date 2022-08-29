import React from 'react';
import FastImage from 'react-native-fast-image';
import { POSTER_DIMENSIONS, TMDB_IMAGE_URL } from '../../util/constants';

type iPosterProps = {
  path: string; // comes after TMDB_IMAGE_URL/
  scale?: number; // 1 is 27*40px, defualt is 5
};

const Poster = (props: iPosterProps) => {
  const { path, scale } = props;
  const _scale = scale || 5;
  return (
    <FastImage
      style={{
        width: POSTER_DIMENSIONS.width * _scale,
        height: POSTER_DIMENSIONS.height * _scale,
      }}
      source={{
        uri: `${TMDB_IMAGE_URL}/${path}`,
      }}
    />
  );
};

export default Poster;
