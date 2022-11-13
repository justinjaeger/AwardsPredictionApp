import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  getPosterDimensionsByWidth,
  PosterSize,
} from '../../../constants/posterDimensions';
import { iCachedTmdbMovie } from '../../../services/cache/types';
import TmdbServices from '../../../services/tmdb';
import Poster from '../../Images/Poster';
import { BodyLarge } from '../../Text';

type iSongListItemProps = {
  tmdbMovieId: number;
  artist: string;
  title: string;
  ranking?: number;
  size?: PosterSize;
  width?: number;
  onPress: () => void;
};

const SongListItem = (props: iSongListItemProps) => {
  const { artist, title, ranking, tmdbMovieId, size, width, onPress } = props;

  const [movie, setMovie] = useState<iCachedTmdbMovie | undefined>();

  useEffect(() => {
    TmdbServices.getTmdbMovie(tmdbMovieId).then((m) => {
      if (m.status === 'success') {
        setMovie(m.data);
      }
    });
  }, [tmdbMovieId]);

  const height = width
    ? getPosterDimensionsByWidth(width).height
    : size || PosterSize.MEDIUM;

  return (
    <View
      style={{
        width: '100%',
        height,
        marginTop: 10,
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <BodyLarge style={{ marginLeft: 10 }}>{ranking?.toString() || ''}</BodyLarge>
        <Poster
          path={movie?.posterPath || null}
          title={movie?.title || ''}
          size={size}
          onPress={onPress}
        />
        <View style={{ flexDirection: 'column' }}>
          <BodyLarge style={{ marginTop: 10, marginLeft: 10 }}>{title}</BodyLarge>
          <BodyLarge style={{ marginTop: 10, marginLeft: 10 }}>{artist}</BodyLarge>
          <BodyLarge style={{ marginTop: 10, marginLeft: 10 }}>
            {movie?.title || ''}
          </BodyLarge>
        </View>
      </View>
    </View>
  );
};

export default SongListItem;
