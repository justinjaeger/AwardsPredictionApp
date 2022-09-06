import React, { useState } from 'react';
import { View } from 'react-native';
import { PosterSize } from '../../../constants/posterDimensions';
import { Contender } from '../../../models';
import { iCachedTmdbPerson } from '../../../services/cache/types';
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

  // NOTE: ideally contender just has contender.person.tmdb accessible on it, but for some reason you can only get contender.contenderPersonId
  useSubscriptionEffect(async () => {
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
        <BodyLarge style={{ marginTop: 10, marginLeft: 10 }}>
          {person?.name || ''}
        </BodyLarge>
      </View>
    </View>
  );
};

export default PerformanceListItem;
