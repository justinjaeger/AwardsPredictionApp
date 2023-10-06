import _ from 'lodash';
import AsyncStorageCache from '.';
import MongoApi from '../api/requests';
import { CategoryType } from '../../types/api';

type iGetManyResult<T> = Record<string, T>;

/**
 * Caches movie, person, and song data stored in Mongo
 * Pass an array of ids
 * Get back an object where the ids are keyed and point to tmdb data
 */
const setItemsInCache = async (
  ids: string[],
  type: CategoryType,
): Promise<iGetManyResult<any>> => {
  const result: iGetManyResult<any> = {};
  console.log('ids.length', ids.length);
  if (ids.length === 0) return result;

  // TODO: remove performance monitoring
  const startTime = performance.now();
  const cacheResult = await AsyncStorageCache.getItems<any>(ids);
  const endTime = performance.now();
  console.log(
    'AsyncStorageCache.getItems took ' + (endTime - startTime) + ' milliseconds.',
  );

  // add all values that were found in cache
  cacheResult.forEach((item, i) => {
    if (!item) return;
    const id = ids[i];
    result[id] = item;
  });

  // for all values that were NOT found, batch request them from db
  const notFoundIds = ids.filter((id, i) => !cacheResult[i]);
  console.log('notFoundIds.length', notFoundIds.length);
  if (notFoundIds.length === 0) return result;

  // TODO: remove performance monitoring
  const startTime2 = performance.now();
  const { data } = await (type === CategoryType.FILM
    ? MongoApi.getMovies(notFoundIds)
    : type === CategoryType.PERFORMANCE
    ? MongoApi.getPersons(notFoundIds)
    : MongoApi.getSongs(notFoundIds));
  const endTime2 = performance.now();
  console.log('MongoApiGetTmdbData took ' + (endTime2 - startTime2) + ' milliseconds.');

  // set values in cache
  const toBeCachedItems = _.entries(data ?? {}).map(([id, data]) => ({
    key: id,
    value: data,
  }));
  if (toBeCachedItems.length > 0) {
    AsyncStorageCache.setItems(toBeCachedItems);
  }
  // set all new values in result
  toBeCachedItems.forEach(({ key, value }) => {
    result[key] = value;
  });
  return result;
};

const TmdbCache = {
  setItemsInCache,
};

export default TmdbCache;
