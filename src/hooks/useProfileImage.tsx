import { useState } from 'react';
import ProfileImageCache from '../services/cache/profileImage';
import { useAsyncEffect } from '../util/hooks';

const useProfileImage = (imageKey: string | undefined) => {
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);

  useAsyncEffect(async () => {
    if (!imageKey) return;
    const uri = await ProfileImageCache.getImageUri(imageKey);
    setProfileImage(uri);
  }, [imageKey]);

  return { uri: profileImage };
};

export default useProfileImage;
