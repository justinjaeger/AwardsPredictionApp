/* eslint-disable sonarjs/no-duplicate-string */
import { useState } from 'react';
import { iCachedTmdbMovie, iCachedTmdbPerson } from '../../../services/cache/types';
import TmdbServices from '../../../services/tmdb';
import { useAsyncEffect } from '../../../util/hooks';
import { iPrediction } from '../../../types';

const useTmdb = (prediction: iPrediction) => {
  const [tmdbMovie, setTmdbMovie] = useState<iCachedTmdbMovie | undefined>();
  const [tmdbPerson, setTmdbPerson] = useState<iCachedTmdbPerson | undefined>();

  const tmdbMovieId = prediction.contenderMovie?.tmdbId;
  const tmdbPersonId = prediction.contenderPerson?.tmdbId;

  // TODO: why is the cache async??
  useAsyncEffect(async () => {
    if (tmdbPersonId) {
      // get tmdb person info
      const { data: personData, status: personStatus } = await TmdbServices.getTmdbPerson(
        tmdbPersonId,
      );
      if (personStatus === 'success') {
        setTmdbPerson(personData);
      }
    }
    if (tmdbMovieId) {
      // get movie tmdb info
      const { data, status } = await TmdbServices.getTmdbMovie(tmdbMovieId);
      if (status === 'success') {
        setTmdbMovie(data);
      }
    }
  }, [tmdbMovieId]);

  return { tmdbMovie, tmdbPerson };
};

export default useTmdb;
