// https://docs.amplify.aws/lib/storage/download/q/platform/react-native/
import { Storage } from 'aws-amplify';

// Upload file to AWS storage
export const getProfileImage = async (key: string) => {
  try {
    const response = await Storage.get(key);
    console.log('retrieved image', response);
    return response;
  } catch (err) {
    console.log('Error uploading file:', err);
  }
};
