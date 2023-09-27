import AsyncStorage from '@react-native-async-storage/async-storage';

const TIME_TO_LIVE = 60 * 60 * 24 * 1 * 1000; // in ms - currently 1 day

type iCachedItem<T> = {
  value: T;
  expiryTime: number;
};

// key would be TMDB_ID for example
// if item doesn't come back, means we have to cache it (so would be making that request to TMDB, then calling setItem)
async function getItem<T>(key: string): Promise<T | undefined> {
  try {
    const item = await AsyncStorage.getItem(key);
    if (!item) {
      return undefined;
    }
    const { value, expiryTime } = JSON.parse(item) as iCachedItem<T>;
    // remove the item from the cache if expired, but still return the value for now
    const isExpired = expiryTime < Date.now();
    if (isExpired) {
      AsyncStorage.removeItem(key);
    }
    return value;
  } catch (err) {
    console.error('error setting item in cache', err);
  }
}

async function getItems<T>(keys: string[]) {
  try {
    const items = await AsyncStorage.multiGet(keys);
    // for each item, check if expired. If so, remove from cache, but still return the value. Next time fetched, will return undefined, and that will indicate to store it.
    const values = items.map(([key, item]) => {
      if (!item) {
        return undefined;
      }
      const { value, expiryTime } = JSON.parse(item) as iCachedItem<T>;
      const isExpired = expiryTime < Date.now();
      if (isExpired) {
        AsyncStorage.removeItem(key);
      }
      return value;
    });
    return values;
  } catch (err) {
    console.error('error getting items in cache', err);
    return [];
  }
}

// key would be TMDB_ID for example
// pointing to an object that holds the movie's data
async function setItem<T>(key: string, value: T) {
  const cacheValue: iCachedItem<T> = {
    expiryTime: Date.now() + TIME_TO_LIVE,
    value,
  };
  const stringifiedValue = JSON.stringify(cacheValue);
  try {
    AsyncStorage.setItem(key, stringifiedValue);
  } catch (err) {
    console.error('error setting item in cache', err);
  }
}

async function setItems<T>(items: { key: string; value: T }[]) {
  const stringifiedValues: [string, string][] = items.map(({ key, value }) => {
    const cacheValue: iCachedItem<T> = {
      expiryTime: Date.now() + TIME_TO_LIVE,
      value,
    };
    return [key, JSON.stringify(cacheValue)];
  });
  try {
    AsyncStorage.multiSet(stringifiedValues);
  } catch (err) {
    console.error('error setting items in cache', err);
  }
}

const AsyncStorageCache = {
  getItem,
  getItems,
  setItem,
  setItems,
};

export default AsyncStorageCache;
