import AsyncStorageCache from '.';

const get = async <T>(tmdbId: number): Promise<T | undefined> => {
  const value = await AsyncStorageCache.getItem(tmdbId.toString());
  if (value === undefined) {
    return undefined;
  } else {
    return value as T;
  }
};

type iGetMany<T> = (T | undefined)[] | undefined;

const getMany = async <T>(tmdbIds: number[]): Promise<iGetMany<T>> => {
  const strings = tmdbIds.map((id) => id.toString());
  const values = await AsyncStorageCache.getItems(strings);
  if (values === undefined) {
    return undefined;
  } else {
    const typedValues = values.map((v) => v as T | undefined);
    return typedValues;
  }
};

const set = async <T>(tmdbId: number, value: T) => {
  return await AsyncStorageCache.setItem(tmdbId.toString(), value);
};

const setMany = async <T>(items: { tmdbId: number; value: T }[]) => {
  const itemsWithStringKeys = items.map(({ tmdbId, value }) => ({
    key: tmdbId.toString(),
    value,
  }));
  if (itemsWithStringKeys.length === 0) return;
  return await AsyncStorageCache.setItems(itemsWithStringKeys);
};

const TmdbCache = {
  get,
  getMany,
  set,
  setMany,
};

export default TmdbCache;
