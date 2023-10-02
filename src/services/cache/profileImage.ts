import AsyncStorageCache from '.';
import ImageStorage from '../storage';

const getImageUri = async (imageKey: string) => {
  const maybeUri = await AsyncStorageCache.getItem<string>(imageKey);
  if (maybeUri) {
    return maybeUri;
  } else {
    const uri = await ImageStorage.getProfileImage(imageKey);
    if (uri) {
      await AsyncStorageCache.setItem(imageKey, uri);
    }
    return uri;
  }
};

const ProfileImageCache = {
  getImageUri,
};

export default ProfileImageCache;
