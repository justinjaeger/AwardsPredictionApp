import { useState } from 'react';
import AWSStorage from '../services/storage';
import { useAsyncEffect } from '../util/hooks';

const useProfileImage = (imageKey: string | undefined) => {
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);

  useAsyncEffect(async () => {
    if (!imageKey) return;
    const res = await AWSStorage.getProfileImage(imageKey);
    setProfileImage(res);
  }, [imageKey]);

  return profileImage;
};

export default useProfileImage;
