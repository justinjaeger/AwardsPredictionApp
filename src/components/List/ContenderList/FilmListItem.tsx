import React, { useState } from 'react';
import { View } from 'react-native';
import { CategoryName } from '../../../API';
import { PosterSize } from '../../../constants/posterDimensions';
import { iCachedTmdbMovie } from '../../../services/cache/types';
import ApiServices from '../../../services/graphql';
import { iNumberPredicting } from '../../../services/graphql/contender';
import TmdbServices from '../../../services/tmdb';
import { useAsyncEffect } from '../../../util/hooks';
import Poster from '../../Images/Poster';
import { BodyLarge } from '../../Text';

type iFilmListItemProps = {
  movieTmdbId: number;
  movieStudio: string | undefined;
  contenderId: string;
  categoryName: CategoryName;
  ranking?: number;
  size?: PosterSize;
  onPress: () => void;
};

const FilmListItem = (props: iFilmListItemProps) => {
  const {
    movieTmdbId,
    movieStudio,
    contenderId,
    categoryName,
    ranking,
    size,
    onPress,
  } = props;

  // TODO: based on category.name (CategoryName), display a distinct piece of information with the film like who the directors or screenwriters are

  const [tmdbMovie, setTmdbMovie] = useState<iCachedTmdbMovie | undefined>();
  const [numPredicting, setNumPredicting] = useState<iNumberPredicting | undefined>(
    undefined,
  );

  useAsyncEffect(async () => {
    TmdbServices.getTmdbMovie(movieTmdbId).then((m) => {
      if (m.status === 'success') {
        setTmdbMovie(m.data);
      }
    });
    const { data } = await ApiServices.getNumberPredicting(contenderId);
    setNumPredicting(data);
  }, [movieTmdbId]);

  const categoryInfo = tmdbMovie?.categoryInfo?.[categoryName];

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
          {categoryName === CategoryName.PICTURE ? (
            <BodyLarge style={{ marginTop: 10, marginLeft: 10 }}>
              {movieStudio || ''}
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
