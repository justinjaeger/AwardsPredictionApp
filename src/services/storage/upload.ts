// https://docs.amplify.aws/lib/storage/upload/q/platform/react-native/#upload-files
import { Storage } from 'aws-amplify';

// Upload file to AWS Storage
export const uploadProfilePicture = async (uri: string, email: string) => {
  // create the file name
  const format = uri.split('.').pop();
  const random = Math.floor(100000 + Math.random() * 900000); // 6 digit random number
  const key = email.split('@')[0] + random + '.' + format;

  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const res = await Storage.put(key, blob, { contentType: 'image/jpeg' });
    return res.key;
  } catch (err) {
    console.log('Error uploading file:', err);
  }
};
