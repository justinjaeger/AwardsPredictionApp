import { ProfileImageSize, ProfileImageSuffix } from '../models';

/**
 * Get the image uri for a given image key and size
 * If it's a v2 image, the image key will have "v2" attached
 * If it's a v1 image, the image key will not have "v2" attached
 * V1 images have no suffix
 * V2 images have a suffix of "sm", "md", or "lg" for small, medium, and large respectively
 */
export const getImageUri = (imageKey: string, size: number) => {
  // get the last 2 characters of the imageKey
  const isV2 = imageKey.slice(-2) === 'v2';

  const suffixOfImageKey = isV2
    ? size <= ProfileImageSize.SMALL
      ? ProfileImageSuffix.SMALL
      : size <= ProfileImageSize.MEDIUM
      ? ProfileImageSuffix.MEDIUM
      : ProfileImageSuffix.LARGE
    : '';

  return `https://awards-app-profile-images-prod.s3.amazonaws.com/public/${imageKey}${suffixOfImageKey}`;
};
