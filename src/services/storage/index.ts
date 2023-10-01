import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const BUCKET = 'awardsapp873e5f6cbb714623a1108c8be7ab2680150001-prod/public/';

const client = new S3Client({
  region: 'us-east-1',
  //   credentials: {
  //     accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  //     secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  //   },
});

// Get file from AWS storage
export const getProfileImage = async (key: string) => {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET,
      Key: key,
    });
    return await client.send(command);
  } catch (err) {
    console.log('Error uploading file:', err);
  }
};

// Upload file to AWS Storage
export const uploadProfilePicture = async (uri: string, email: string) => {
  // create the file name
  const format = uri.split('.').pop();
  const random = Math.floor(100000 + Math.random() * 900000); // 6 digit random number
  const key = email.split('@')[0] + random + '.' + format;

  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: blob,
      ContentType: 'image/jpeg',
    });
    await client.send(command);
    return key;
  } catch (err) {
    console.log('Error uploading file:', err);
  }
};

const AWSStorage = {
  getProfileImage,
  uploadProfilePicture,
};

export default AWSStorage;
