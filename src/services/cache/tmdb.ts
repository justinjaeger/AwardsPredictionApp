import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cache } from 'react-native-cache';

export type iTmdbCacheItem = {
  title: string;
  plot: string;
  imdbId: string;
  year: number | null;
  productionCompanies: string[];
  productionCountries: string[];
  backdropPath: string | null;
  posterPath: string | null;
};

const tmdbCache = new Cache({
  namespace: 'tmdb',
  policy: {
    maxEntries: 50000, // if unspecified, it can have unlimited entries
    stdTTL: 60 * 60 * 24, // in seconds
  },
  backend: AsyncStorage,
});

const get = async (tmdbId: string) => {
  await tmdbCache.get(tmdbId);
};

const set = async (tmdbId: string, value: iTmdbCacheItem) => {
  await tmdbCache.set(tmdbId, JSON.stringify(value));
};

const remove = async (tmdbId: string) => {
  await tmdbCache.remove(tmdbId);
};

const peek = async (tmdbId: string) => {
  await tmdbCache.peek(tmdbId);
};

const consoleLogAllEntries = async () => {
  await tmdbCache.getAll();
};

const clearAll = async () => {
  await tmdbCache.clearAll();
};

const TmdbCache = {
  get,
  set,
  remove,
  peek,
  clearAll,
  consoleLogAllEntries,
};

export default TmdbCache;
