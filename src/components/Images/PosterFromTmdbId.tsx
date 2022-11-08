import React, { useState } from 'react';
import { ImageStyle, StyleProp } from 'react-native';
import { PosterSize } from '../../constants/posterDimensions';
import { iCachedTmdbMovie, iCachedTmdbPerson } from '../../services/cache/types';
import TmdbServices from '../../services/tmdb';
import { useAsyncEffect } from '../../util/hooks';
import Poster from './Poster';

type iPosterFromTmdbProps = {
  size?: PosterSize; // 1 is 27*40px, defualt is 5
  onPress?: () => void;
  styles?: StyleProp<ImageStyle>;
};

const PosterFromMovieTmdbId = (props: iPosterFromTmdbProps & { movieTmdbId: number }) => {
  const { movieTmdbId, size, onPress, styles } = props;

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
      size={size}
      onPress={onPress}
      styles={styles}
    />
  );
};

const PosterFromPersonTmdbId = (
  props: iPosterFromTmdbProps & { personTmdbId: number },
) => {
  const { personTmdbId, size, onPress, styles } = props;

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
      size={size}
      onPress={onPress}
      styles={styles}
    />
  );
};

const PosterFromTmdbId = (
  props: iPosterFromTmdbProps & { movieTmdbId: number; personTmdbId?: number },
) =>
  props.personTmdbId ? (
    <PosterFromPersonTmdbId {...props} personTmdbId={props.personTmdbId} />
  ) : (
    <PosterFromMovieTmdbId {...props} />
  );

export default React.memo(PosterFromTmdbId);
