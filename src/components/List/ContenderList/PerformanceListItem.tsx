import React, { useState } from 'react';
import { View } from 'react-native';
import {
  getPosterDimensionsByWidth,
  PosterSize,
} from '../../../constants/posterDimensions';
import { iCachedTmdbMovie, iCachedTmdbPerson } from '../../../services/cache/types';
import TmdbServices from '../../../services/tmdb';
import { useSubscriptionEffect } from '../../../util/hooks';
import Poster from '../../Images/Poster';
import { BodyLarge } from '../../Text';

type iPerformanceListItemProps = {
  tmdbPersonId: number;
  tmdbMovieId: number;
  ranking?: number;
  size?: PosterSize;
  width?: number;
  onPress: () => void;
};

const PerformanceListItem = (props: iPerformanceListItemProps) => {
  const { tmdbPersonId, tmdbMovieId, ranking, size, width, onPress } = props;

  const [tmdbPerson, setTmdbPerson] = useState<iCachedTmdbPerson | undefined>();
  const [tmdbMovie, setTmdbMovie] = useState<iCachedTmdbMovie | undefined>();

  useSubscriptionEffect(async () => {
    // get tmdb person info
    TmdbServices.getTmdbPerson(tmdbPersonId).then((p) => {
      if (p.status === 'success') {
        setTmdbPerson(p.data);
      }
    });
    // get movie tmdb info
    TmdbServices.getTmdbMovie(tmdbMovieId).then((m) => {
      if (m.status === 'success') {
        setTmdbMovie(m.data);
      }
    });
  }, [tmdbMovieId, tmdbPersonId]);

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
          path={tmdbPerson?.profilePath || null}
          title={tmdbPerson?.name || ''}
          width={width}
          onPress={onPress}
        />
        <View style={{ flexDirection: 'column' }}>
          <BodyLarge style={{ marginTop: 10, marginLeft: 10 }}>
            {tmdbPerson?.name || ''}
          </BodyLarge>
          {tmdbMovie ? (
            <BodyLarge style={{ marginTop: 10, marginLeft: 10 }}>
              {tmdbMovie.title || ''}
            </BodyLarge>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default PerformanceListItem;
