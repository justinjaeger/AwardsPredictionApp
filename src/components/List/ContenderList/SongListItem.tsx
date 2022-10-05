import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { PosterSize } from '../../../constants/posterDimensions';
import { Song } from '../../../models';
import { iCachedTmdbMovie } from '../../../services/cache/types';
import DS from '../../../services/datastore';
import TmdbServices from '../../../services/tmdb';
import { useAsyncEffect } from '../../../util/hooks';
import Poster from '../../Images/Poster';
import { BodyLarge } from '../../Text';

type iSongListItemProps = {
  tmdbMovieId: number;
  songId: string;
  ranking?: number;
  size?: PosterSize;
  onPress: () => void;
};

const SongListItem = (props: iSongListItemProps) => {
  const { songId, ranking, tmdbMovieId, size, onPress } = props;

  const [movie, setMovie] = useState<iCachedTmdbMovie | undefined>();
  const [song, setSong] = useState<Song | undefined>();

  useEffect(() => {
    TmdbServices.getTmdbMovie(tmdbMovieId).then((m) => {
      if (m.status === 'success') {
        setMovie(m.data);
      }
    });
  }, [tmdbMovieId]);

  useAsyncEffect(async () => {
    const { data: song } = await DS.getSongById(songId);
    setSong(song);
  }, [songId]);

  // TODO: create better loading state
  if (!song) return null;

  return (
    <View
      style={{
        width: '100%',
        height: size || PosterSize.MEDIUM,
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
          <BodyLarge style={{ marginTop: 10, marginLeft: 10 }}>{song.title}</BodyLarge>
          <BodyLarge style={{ marginTop: 10, marginLeft: 10 }}>{song.artist}</BodyLarge>
          <BodyLarge style={{ marginTop: 10, marginLeft: 10 }}>
            {movie?.title || ''}
          </BodyLarge>
        </View>
      </View>
    </View>
  );
};

export default SongListItem;
