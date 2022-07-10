import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Unused for now, but might be handy later if wanting to do any caching
 * or store user preferences
 */

const _storeData = async (key: string, value: string) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

const _retrieveData = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(error);
  }
};

export { _storeData, _retrieveData };
