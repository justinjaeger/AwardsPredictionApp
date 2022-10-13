import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { PosterSize } from '../../../constants/posterDimensions';
import { CategoryName, Category, Movie, Contender } from '../../../models';

import { iCachedTmdbMovie } from '../../../services/cache/types';
import DS from '../../../services/datastore';
import { iNumberPredicting } from '../../../services/datastore/contender';
import TmdbServices from '../../../services/tmdb';
import Poster from '../../Images/Poster';
import { BodyLarge } from '../../Text';

type iFilmListItemProps = {
  movieId: string;
  contenderId: string;
  categoryId: string;
  ranking?: number;
  size?: PosterSize;
  onPress: () => void;
};

const FilmListItem = (props: iFilmListItemProps) => {
  const { movieId, contenderId, categoryId, ranking, size, onPress } = props;

  const movieTmdbId = movie.tmdbId;

  // TODO: based on category.name (CategoryName), display a distinct piece of information with the film like who the directors or screenwriters are

  const [tmdbMovie, setTmdbMovie] = useState<iCachedTmdbMovie | undefined>();
  const [numPredicting, setNumPredicting] = useState<iNumberPredicting | undefined>(
    undefined,
  );

  useEffect(() => {
    TmdbServices.getTmdbMovie(movieTmdbId).then((m) => {
      if (m.status === 'success') {
        setTmdbMovie(m.data);
      }
    });
    DS.getNumberPredicting(contender).then(({ data }) => {
      setNumPredicting(data);
    });
  }, [movieTmdbId]);

  const categoryInfo = tmdbMovie?.categoryInfo?.[category.name];

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
          {size !== PosterSize.SMALL ? (
            <>
              <BodyLarge
                style={{ marginLeft: 10 }}
              >{`pred win: ${numPredicting?.predictingWin}`}</BodyLarge>
              <BodyLarge
                style={{ marginLeft: 10 }}
              >{`pred nom: ${numPredicting?.predictingNom}`}</BodyLarge>
              <BodyLarge
                style={{ marginLeft: 10 }}
              >{`pred unranked: ${numPredicting?.predictingUnranked}`}</BodyLarge>
            </>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default FilmListItem;
