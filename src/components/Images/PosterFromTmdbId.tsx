import React, { useState } from 'react';
import { ImageStyle, StyleProp } from 'react-native';
import { ContenderAccolade, PredictionType } from '../../API';
import { iCachedTmdbMovie, iCachedTmdbPerson } from '../../services/cache/types';
import TmdbServices from '../../services/tmdb';
import { useAsyncEffect } from '../../util/hooks';
import Poster from './Poster';

type iPosterFromTmdbProps = {
  width?: number;
  ranking?: number;
  onPress?: () => void;
  accolade?: ContenderAccolade | undefined;
  predictionType?: PredictionType;
  styles?: StyleProp<ImageStyle>;
};

const PosterFromMovieTmdbId = (props: iPosterFromTmdbProps & { movieTmdbId: number }) => {
  const { movieTmdbId, width, onPress, ranking, accolade, predictionType, styles } =
    props;

  const [movieDetails, setMovieDetails] = useState<iCachedTmdbMovie>();

  useAsyncEffect(async () => {
    const { data } = await TmdbServices.getTmdbMovie(movieTmdbId);
    setMovieDetails(data);
  }, [movieTmdbId]);

  const { posterPath: path, title } = movieDetails || {};

  return (
    <Poster
      path={path || null} // this will render the loading state if null
      title={title || ''}
      width={width}
      ranking={ranking}
      onPress={onPress}
      styles={styles}
      accolade={accolade}
      predictionType={predictionType}
    />
  );
};

const PosterFromPersonTmdbId = (
  props: iPosterFromTmdbProps & { personTmdbId: number },
) => {
  const { personTmdbId, onPress, width, ranking, accolade, predictionType, styles } =
    props;

  const [personDetails, setPersonDetails] = useState<iCachedTmdbPerson>();

  useAsyncEffect(async () => {
    TmdbServices.getTmdbPerson(personTmdbId).then((res) => {
      setPersonDetails(res.data);
    });
  }, [personTmdbId]);

  const { profilePath: path, name: title } = personDetails || {};

  return (
    <Poster
      path={path || null} // this will render the loading state if null
      title={title || ''}
      width={width}
      ranking={ranking}
      onPress={onPress}
      styles={styles}
      accolade={accolade}
      predictionType={predictionType}
    />
  );
};

const PosterFromTmdbId = (
  props: iPosterFromTmdbProps & {
    movieTmdbId?: number;
    personTmdbId?: number;
  },
) =>
  props.personTmdbId ? (
    <PosterFromPersonTmdbId {...props} personTmdbId={props.personTmdbId} />
  ) : props.movieTmdbId ? (
    <PosterFromMovieTmdbId {...props} movieTmdbId={props.movieTmdbId} />
  ) : null;

export default React.memo(PosterFromTmdbId);
