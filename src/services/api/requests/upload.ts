import { API_ENDPOINT } from '../../../config';
import KeychainStorage from '../../keychain';

/**
 * If this doesn't work here's a fun nightmare:
 * https://github.com/aws/aws-sdk-js-v3/issues/4877#issuecomment-1656007484
 */

export const uploadProfilePicture = async (uri: string) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const { data } = await KeychainStorage.get();
    const token = data?.accessToken;
    await fetch(`${API_ENDPOINT}/imageV2`, {
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
