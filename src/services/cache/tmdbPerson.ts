import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cache } from 'react-native-cache';
import { iCachedTmdbPerson } from './types';

const tmdbPersonCache = new Cache({
  namespace: 'tmdb-people',
  policy: {
    maxEntries: 50000, // if unspecified, it can have unlimited entries
    stdTTL: 60 * 60 * 24, // in seconds
  },
  backend: AsyncStorage,
});

const get = async (tmdbId: number) => {
  const value = await tmdbPersonCache.get(tmdbId.toString());
  if (value !== undefined) {
    return JSON.parse(value) as iCachedTmdbPerson;
  }
  return value;
};

const set = async (tmdbId: number, value: iCachedTmdbPerson) => {
  return await tmdbPersonCache.set(tmdbId.toString(), JSON.stringify(value));
};

const remove = async (tmdbId: number) => {
  return await tmdbPersonCache.remove(tmdbId.toString());
};

const getAllEntries = async () => {
  const values = await tmdbPersonCache.getAll();
  return Object.values(values).map((v) => JSON.parse(v)) as iCachedTmdbPerson[];
};

const clearAll = async () => {
  return await tmdbPersonCache.clearAll();
};

const TmdbPersonCache = {
  get,
  set,
  remove,
  clearAll,
  getAllEntries,
};

export default TmdbPersonCache;
