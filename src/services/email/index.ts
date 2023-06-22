import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
// import { iApiResponse } from '../utils';
import { Auth } from 'aws-amplify';
// FOR NOT HAVING IT SEND AN ERROR
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import { iApiResponse } from '../utils';
import { SIGN_IN_PREFIX } from '../../hooks/useDeepLink';
import VerificationCodeStorage from '../keychain/verificationCode';
import Snackbar from '../../components/Snackbar';

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-lambda/classes/invokecommand.html

const toUint8array = (json: any) => {
  const str = JSON.stringify(json, null, 0);
  const ret = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    ret[i] = str.charCodeAt(i);
  }
  return ret;
};

const sendConfirmationCode = async (
  email: string,
  link: string,
): Promise<iApiResponse<any>> => {
  try {
    // https://stackoverflow.com/questions/56106825/invoke-lambda-function-from-amplify-generated-react-app-without-using-api-gatewa
    const credentials = await Auth.currentCredentials(); // expect user to be signed out "unauth" since we don't use the Cognito user pools anymore
    if (!credentials) throw new Error('No credentials in sendConfirmationCode');
    const lambda = new LambdaClient({
      region: 'us-east-1',
      credentials: Auth.essentialCredentials(credentials),
    });
    const payload = { email, link };
    const command = new InvokeCommand({
      FunctionName: 'sendEmail-dev', // TODO: change to prod
      Payload: toUint8array(payload),
    });
    // NOTE: This doesn't handle bugs on the LAMBDA FUNCTION side, just says "success we attempted it"
    const res = await lambda.send(command);
    console.log('res', res);
    return { status: 'success' };
  } catch (err) {
    console.log('Error in sendConfirmationCode: ', err);
    return { status: 'error', error: err };
  }
};

/**
 * generateVerificationCode
 * generate link
 * email link to the user
 */
const sendCode = async (email: string): Promise<boolean> => {
  // GENERATE LINK (will be like: "oscar://signin/?code=1234567890")
  const code = Math.random().toString(36).slice(-12); // random string of 12 characters including special characters
  // STORE IN LOCAL STORAGE and make it expire in like 10 minutes
  const link = SIGN_IN_PREFIX + '?code=' + code;
  console.log('verification link:', link);
  const { status } = await sendConfirmationCode(email, link);
  if (status === 'error') {
    return false;
  }
  const { status: vcStatus } = await VerificationCodeStorage.set(code);
  if (vcStatus === 'error') {
    return false;
  }
  return true;
};

/**
 * parse the code from the link
 * verify that the code is valid
 * show an error message if throws an error
 */
const confirmCode = async (link: string): Promise<boolean> => {
  const code = link.split('?code=')[1];
  const { status, data } = await VerificationCodeStorage.verify(code);
  if (status === 'success') {
    await VerificationCodeStorage.remove();
    return true;
  }
  const maybeMessage = data?.message;
  if (maybeMessage) {
    Snackbar.error(maybeMessage);
  }
  return false;
};

const EmailService = {
  sendCode,
  confirmCode,
};

export default EmailService;
