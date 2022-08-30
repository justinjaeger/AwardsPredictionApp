import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cache } from 'react-native-cache';
import { iCachedTmdbCredits } from './types';

const tmdbCreditsCache = new Cache({
  namespace: 'tmdb',
  policy: {
    maxEntries: 50000, // if unspecified, it can have unlimited entries
    stdTTL: 60 * 60 * 24, // in seconds
  },
  backend: AsyncStorage,
});

const get = async (tmdbId: string) => {
  const value = await tmdbCreditsCache.get(tmdbId);
  if (value !== undefined) {
    return JSON.parse(value) as iCachedTmdbCredits;
  }
  return value;
};

const peek = async (tmdbId: string) => {
  const value = await tmdbCreditsCache.peek(tmdbId);
  if (value !== undefined) {
    return JSON.parse(value) as iCachedTmdbCredits;
  }
  return value;
};

const set = async (tmdbId: string, value: iCachedTmdbCredits) => {
  return await tmdbCreditsCache.set(tmdbId, JSON.stringify(value));
};

const remove = async (tmdbId: string) => {
  return await tmdbCreditsCache.remove(tmdbId);
};

const getAllEntries = async () => {
  const values = await tmdbCreditsCache.getAll();
  return Object.values(values).map((v) => JSON.parse(v)) as iCachedTmdbCredits[];
};

const clearAll = async () => {
  return await tmdbCreditsCache.clearAll();
};

const TmdbCreditsCache = {
  get,
  set,
  remove,
  peek,
  clearAll,
  getAllEntries,
};

export default TmdbCreditsCache;
