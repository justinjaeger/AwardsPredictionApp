import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cache } from 'react-native-cache';
import { iCachedTmdbMovie } from './types';

const tmdbMovieCache = new Cache({
  namespace: 'tmdb-movies',
  policy: {
    maxEntries: 50000, // if unspecified, it can have unlimited entries
    stdTTL: 60 * 60 * 24, // in seconds
  },
  backend: AsyncStorage,
});

const get = async (tmdbId: number) => {
  const value = await tmdbMovieCache.get(tmdbId.toString());
  if (value !== undefined) {
    return JSON.parse(value) as iCachedTmdbMovie;
  }
  return value;
};

const peek = async (tmdbId: number) => {
  const value = await tmdbMovieCache.peek(tmdbId.toString());
  if (value !== undefined) {
    return JSON.parse(value) as iCachedTmdbMovie;
  }
  return value;
};

const set = async (tmdbId: number, value: iCachedTmdbMovie) => {
  return await tmdbMovieCache.set(tmdbId.toString(), JSON.stringify(value));
};

const remove = async (tmdbId: number) => {
  return await tmdbMovieCache.remove(tmdbId.toString());
};

const getAllEntries = async () => {
  const values = await tmdbMovieCache.getAll();
  return Object.values(values).map((v) => JSON.parse(v)) as iCachedTmdbMovie[];
};

const clearAll = async () => {
  return await tmdbMovieCache.clearAll();
};

const TmdbMovieCache = {
  get,
  set,
  remove,
  peek,
  clearAll,
  getAllEntries,
};

export default TmdbMovieCache;
