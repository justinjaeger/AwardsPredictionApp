// https://docs.amplify.aws/lib/storage/download/q/platform/react-native/
import { Storage } from 'aws-amplify';

// Upload file to AWS storage
export const getProfileImage = async (key: string) => {
  try {
    return await Storage.get(key);
  } catch (err) {
    console.log('Error uploading file:', err);
  }
};
