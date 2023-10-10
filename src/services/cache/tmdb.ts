import _ from 'lodash';
import AsyncStorageCache from '.';
import MongoApi from '../api/requests';
import { iTmdbDataStoreRecords } from '../../context/TmdbDataStore';

/**
 * Caches movie, person, and song data stored in Mongo
 * Pass an array of ids
 * Get back an object where the ids are keyed and point to tmdb data
 */
const setItemsInAsyncStorage = async (
  ids: string[],
  eventYear: number,
): Promise<iTmdbDataStoreRecords> => {
  console.log('ids.length', ids.length);
  const storedItems: iTmdbDataStoreRecords = {};
  if (ids.length === 0) return storedItems;

  // First, check AsyncStorage for the IDs
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
    storedItems[id] = item;
  });

  // if any items were NOT found, make a request for all films that year
  // TODO: could make more efficient by getting ONLY the missing items
  const notFoundIds = ids.filter((id, i) => !cacheResult[i]);
  console.log('notFoundIds.length', notFoundIds.length);
  if (notFoundIds.length > 0) {
    // TODO: remove performance monitoring
    const startTime2 = performance.now();
    const { data } = await MongoApi.getApiData({ eventYear });
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
      if (typeof value === 'object') {
        storedItems[key] = value;
      }
    });
  }
  return storedItems;
};

const TmdbCache = {
  setItemsInAsyncStorage,
};

export default TmdbCache;
