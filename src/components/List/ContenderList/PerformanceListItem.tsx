import React, { useState } from 'react';
import { View } from 'react-native';
import { PosterSize } from '../../../constants/posterDimensions';
import { Contender } from '../../../models';
import { iCachedTmdbMovie, iCachedTmdbPerson } from '../../../services/cache/types';
import DS from '../../../services/datastore';
import TmdbServices from '../../../services/tmdb';
import { useSubscriptionEffect } from '../../../util/hooks';
import Poster from '../../Images/Poster';
import { BodyLarge } from '../../Text';

type iPerformanceListItemProps = {
  contender: Contender;
  ranking?: number;
  onPress: () => void;
};

const PerformanceListItem = (props: iPerformanceListItemProps) => {
  const { contender, ranking, onPress } = props;

  const [person, setPerson] = useState<iCachedTmdbPerson | undefined>();
  const [tmdbMovie, setTmdbMovie] = useState<iCachedTmdbMovie | undefined>();

  useSubscriptionEffect(async () => {
    // get tmdb person info
    if (contender.contenderPersonId) {
      const { data: p } = await DS.getPersonById(contender.contenderPersonId);
      if (p) {
        TmdbServices.getTmdbPerson(p.tmdbId).then((p) => {
          if (p.status === 'success') {
            setPerson(p.data);
          }
        });
      }
    }
    // get movie tmdb info
    TmdbServices.getTmdbMovie(contender.movie.tmdbId).then((m) => {
      if (m.status === 'success') {
        setTmdbMovie(m.data);
      }
    });
  }, [contender]);

  // TODO: create better loading state

  return (
    <View
      style={{
        width: '100%',
        height: PosterSize.MEDIUM,
        marginTop: 10,
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <BodyLarge style={{ marginLeft: 10 }}>{ranking?.toString() || ''}</BodyLarge>
        <Poster
          path={person?.profilePath || null}
          title={person?.name || ''}
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
