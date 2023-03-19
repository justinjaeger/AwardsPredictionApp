import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cache } from 'react-native-cache';
import AWSStorage from '../storage';

const profileImageCache = new Cache({
  namespace: 'profile-image',
  policy: {
    maxEntries: 50000, // if unspecified, it can have unlimited entries
    stdTTL: 7 * 60 * 60 * 24, // in seconds
  },
  backend: AsyncStorage,
});

const getImageUri = async (imageKey: string) => {
  const maybeUri = await profileImageCache.get(imageKey);
  if (maybeUri) {
    return maybeUri;
  } else {
    const uri = await AWSStorage.getProfileImage(imageKey);
    if (uri) {
      await profileImageCache.set(imageKey, uri);
    }
    return uri;
  }
};

const ProfileImageCache = {
  getImageUri,
};

export default ProfileImageCache;
