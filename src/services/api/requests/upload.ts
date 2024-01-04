import { API_ENDPOINT } from '../../../config';
import KeychainStorage from '../../keychain';

/**
 * If this doesn't work here's a fun nightmare:
 * https://github.com/aws/aws-sdk-js-v3/issues/4877#issuecomment-1656007484
 */

export const uploadProfilePicture = async (uri: string, size: 'sm' | 'md' | 'lg') => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const { data } = await KeychainStorage.get();
    const token = data?.accessToken;
    const path = size === 'sm' ? 'imageSm' : size === 'md' ? 'imageMd' : 'imageLg';

    await fetch(`${API_ENDPOINT}/${path}`, {
      method: 'POST',
      body: blob,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (err) {
    console.log('Error uploading s3file:', err);
  }
};
