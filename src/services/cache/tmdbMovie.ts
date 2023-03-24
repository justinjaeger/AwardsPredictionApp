import AsyncStorageCache from '.';
import { iCachedTmdbMovie } from './types';

const get = async (tmdbId: number): Promise<iCachedTmdbMovie | undefined> => {
  const value = await AsyncStorageCache.getItem(tmdbId.toString());
  if (value === undefined) {
    return undefined;
  } else {
    return value as iCachedTmdbMovie;
  }
};

const set = async (tmdbId: number, value: iCachedTmdbMovie) => {
  return await AsyncStorageCache.setItem(tmdbId.toString(), value);
};

const TmdbMovieCache = {
  get,
  set,
};

export default TmdbMovieCache;
