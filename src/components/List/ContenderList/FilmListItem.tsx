import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { PosterSize } from '../../../constants/posterDimensions';
import { CategoryName, Category, Movie } from '../../../models';

import { iCachedTmdbMovie } from '../../../services/cache/types';
import TmdbServices from '../../../services/tmdb';
import Poster from '../../Images/Poster';
import { BodyLarge } from '../../Text';

type iContenderListItemProps = {
  movie: Movie;
  category: Category;
  ranking?: number;
  size?: PosterSize;
  onPress: () => void;
};

const ContenderListItem = (props: iContenderListItemProps) => {
  const { movie, category, ranking, size, onPress } = props;

  const movieTmdbId = movie.tmdbId;

  // TODO: based on category.name (CategoryName), display a distinct piece of information with the film like who the directors or screenwriters are

  const [tmdbMovie, setTmdbMovie] = useState<iCachedTmdbMovie | undefined>();

  useEffect(() => {
    TmdbServices.getTmdbMovie(movieTmdbId).then((m) => {
      if (m.status === 'success') {
        setTmdbMovie(m.data);
      }
    });
  }, [movieTmdbId]);

  const categoryInfo = tmdbMovie?.categoryInfo?.[category.name];

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
          path={tmdbMovie?.posterPath || null}
          title={tmdbMovie?.title || ''}
          size={size}
          onPress={onPress}
        />
        <View style={{ flexDirection: 'column' }}>
          <BodyLarge style={{ marginTop: 10, marginLeft: 10 }}>
            {tmdbMovie?.title || ''}
          </BodyLarge>
          {category.name === CategoryName.PICTURE ? (
            <BodyLarge style={{ marginTop: 10, marginLeft: 10 }}>
              {movie.studio || ''}
            </BodyLarge>
          ) : null}
          {categoryInfo ? (
            <BodyLarge style={{ marginLeft: 10 }}>{categoryInfo.join(', ')}</BodyLarge>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default ContenderListItem;
