import AsyncStorageCache from '.';
import { iCachedTmdbPerson } from './types';

const get = async (tmdbId: number): Promise<iCachedTmdbPerson | undefined> => {
  const value = await AsyncStorageCache.getItem(tmdbId.toString());
  if (value === undefined) {
    return undefined;
  } else {
    return value as iCachedTmdbPerson;
  }
};

const set = async (tmdbId: number, value: iCachedTmdbPerson) => {
  return await AsyncStorageCache.setItem(tmdbId.toString(), value);
};

const TmdbPersonCache = {
  get,
  set,
};

export default TmdbPersonCache;
