/* eslint-disable sonarjs/no-duplicate-string */
import { useState } from 'react';
import { iCachedTmdbMovie, iCachedTmdbPerson } from '../../../services/cache/types';
import TmdbServices from '../../../services/tmdb';
import { iPrediction } from '../../../types';
import { useAsyncEffect } from '../../../util/hooks';

/**
 * Note: Not used right now.
 * Problem was that TMDB sometimes can't handle a ton of requests so doing it in one makes every single movie/poster fail instead of just the requests that fail
 * also I am unclear as to whether this is actually faster than just doing it one by one
 * I thought originally it would improve list performance but I don't htink that's true
 * What would improve list performance is reducing the complexity therein, and the image size, and taking out the animation and replacing that with something else. But this is NOT priority
 */
const useGetTmdbData = (predictions: iPrediction[]) => {
  const [tmdbMovies, setTmdbMovies] = useState<{ [tmdbId: string]: iCachedTmdbMovie }>(
    {},
  );
  const [tmdbPeople, setTmdbPeople] = useState<{ [tmdbId: string]: iCachedTmdbPerson }>(
    {},
  );

  const tmdbMovieIds = predictions.map((p) => p.contenderMovie?.tmdbId);
  const tmdbPersonIds = predictions.map((p) => p.contenderPerson?.tmdbId);

  useAsyncEffect(async () => {
    if (tmdbMovieIds) {
      const onlyDefinedValues = tmdbMovieIds.filter((id) => id !== undefined) as number[];
      const moviesNotInCache = onlyDefinedValues.filter((id) => !tmdbMovies[id]);
      if (moviesNotInCache.length > 0) {
        // this is ONLY gonna get the movies that aren't in the cache, so add them all in when done
        const { data } = await TmdbServices.getTmdbMovies(moviesNotInCache);
        if (data) {
          setTmdbMovies((curr) => ({ ...curr, ...data }));
        }
      }
    }
  }, [JSON.stringify(tmdbMovieIds)]); // lets it not re-render when you're moving items around, just when you add stuff

  //   // get tmdb person info
  useAsyncEffect(async () => {
    if (tmdbPersonIds) {
      const onlyDefinedValues = tmdbPersonIds.filter(
        (id) => id !== undefined,
      ) as number[];
      const peopleNotInCache = onlyDefinedValues.filter((id) => !tmdbPeople[id]);
      if (peopleNotInCache.length > 0) {
        // this is ONLY gonna get the movies that aren't in the cache, so add them all in when done
        const { data } = await TmdbServices.getTmdbPeople(peopleNotInCache);
        if (data) {
          setTmdbPeople((curr) => ({ ...curr, ...data }));
        }
      }
    }
  }, [JSON.stringify(tmdbPersonIds.length)]); // lets it not re-render when you're moving items around, just when you add stuff

  return { tmdbMovies, tmdbPeople };
};

export default useGetTmdbData;
