import React, { useState } from 'react';
import { View } from 'react-native';
import { PosterSize } from '../../../constants/posterDimensions';
import { iCachedTmdbMovie, iCachedTmdbPerson } from '../../../services/cache/types';
import ApiServices from '../../../services/graphql';
import TmdbServices from '../../../services/tmdb';
import { useSubscriptionEffect } from '../../../util/hooks';
import Poster from '../../Images/Poster';
import { BodyLarge } from '../../Text';

type iPerformanceListItemProps = {
  contenderPersonId: string;
  contenderMovieId: string;
  ranking?: number;
  size?: PosterSize;
  onPress: () => void;
};

const PerformanceListItem = (props: iPerformanceListItemProps) => {
  const { contenderPersonId, contenderMovieId, ranking, size, onPress } = props;

  const [person, setPerson] = useState<iCachedTmdbPerson | undefined>();
  const [tmdbMovie, setTmdbMovie] = useState<iCachedTmdbMovie | undefined>();

  useSubscriptionEffect(async () => {
    // get tmdb person info
    if (contenderPersonId) {
      const { data: person } = await ApiServices.getPerson(contenderPersonId);
      const p = person?.getPerson;
      if (!p) return;
      TmdbServices.getTmdbPerson(p.tmdbId).then((p) => {
        if (p.status === 'success') {
          setPerson(p.data);
        }
      });
    }
    const { data: movie } = await ApiServices.getMovie(contenderMovieId);
    const m = movie?.getMovie;
    if (!m) return;
    // get movie tmdb info
    TmdbServices.getTmdbMovie(m.tmdbId).then((m) => {
      if (m.status === 'success') {
        setTmdbMovie(m.data);
      }
    });
  }, [contenderPersonId, contenderMovieId]);

  // TODO: create better loading state

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
          path={person?.profilePath || null}
          title={person?.name || ''}
          size={size}
          onPress={onPress}
        />
        <View style={{ flexDirection: 'column' }}>
          <BodyLarge style={{ marginTop: 10, marginLeft: 10 }}>
            {person?.name || ''}
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
