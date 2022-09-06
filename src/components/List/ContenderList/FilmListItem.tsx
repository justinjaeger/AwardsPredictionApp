import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { PosterSize } from '../../../constants/posterDimensions';
import { Category } from '../../../models';
import { iCachedTmdbMovie } from '../../../services/cache/types';
import TmdbServices from '../../../services/tmdb';
import Poster from '../../Images/Poster';
import { BodyLarge } from '../../Text';

type iContenderListItemProps = {
  tmdbId: number;
  category: Category;
  ranking?: number;
  onPress: () => void;
};

const ContenderListItem = (props: iContenderListItemProps) => {
  const { tmdbId, category, ranking, onPress } = props;

  // TODO: based on category.name (CategoryName), display a distinct piece of information with the film like who the directors or screenwriters are

  const [movie, setMovie] = useState<iCachedTmdbMovie | undefined>();

  useEffect(() => {
    TmdbServices.getTmdbMovie(tmdbId).then((m) => {
      if (m.status === 'success') {
        setMovie(m.data);
      }
    });
  }, [tmdbId]);

  const categoryInfo = movie?.categoryInfo?.[category.name];

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
        {categoryInfo ? (
          <BodyLarge style={{ marginLeft: 10 }}>{JSON.stringify(categoryInfo)}</BodyLarge>
        ) : null}
        <BodyLarge style={{ marginLeft: 10 }}>{ranking?.toString() || ''}</BodyLarge>
        <Poster
          path={movie?.posterPath || null}
          title={movie?.title || ''}
          onPress={onPress}
        />
        <BodyLarge style={{ marginTop: 10, marginLeft: 10 }}>
          {movie?.title || ''}
        </BodyLarge>
      </View>
    </View>
  );
};

export default ContenderListItem;
