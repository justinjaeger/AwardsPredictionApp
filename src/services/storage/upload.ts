import { Auth, Storage } from 'aws-amplify';

// Upload file to specified bucket.
export const pathToImageFile = async (uri: string, email: string) => {
  //   console.log('uri', uri);
  //   // generate random 6 digit number
  //   const random = Math.floor(100000 + Math.random() * 900000);
  //   const key = email.split('@')[0] + random;
  //   console.log('key', key);

  try {
    // const user = await Auth.currentAuthenticatedUser();
    // console.log('userrrrrr', user);
    // const res = await Storage.list('');
    // upload a simple text file and attempt to retrieve it, or one that exists if put() fails
    // const res: any = await Storage.put('test.txt', 'This is some sample text');
    // console.log('res1', res);
    const res = await Storage.get('text.txt');
    console.log('res2', res);
    // const response = await fetch(uri);
    // console.log('response', response);
    // const blob = await response.blob();
    // console.log('blob', blob);
    // const res = await Storage.put(key, 'blob');
    // console.log('res', res);
    // return res.key;
  } catch (err) {
    console.log('Error uploading file:', err);
  }
};
