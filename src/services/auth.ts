import { CognitoUser } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import Snackbar from '../components/Snackbar';

interface iAuthServiceReturn<T> {
  status: 'success' | 'error';
  data?: T;
  error?: any;
  message?: string;
}

const handleError = (message?: string, error?: any): iAuthServiceReturn<any> => {
  console.log(message, error);
  const m = error.message || message;
  Snackbar.error(m || '');
  return { status: 'error', message: m, error };
};

const signUp = async (
  email: string,
  password: string,
): Promise<iAuthServiceReturn<CognitoUser>> => {
  try {
    const { user } = await Auth.signUp({
      username: email,
      password,
      attributes: {
        email, // optional
        // other custom attributes
      },
    });
    console.log('signUp user', user);
    return { status: 'success', data: user };
  } catch (error) {
    return handleError('Error signing up.', error);
  }
};

const signIn = async (
  email: string,
  password: string,
): Promise<iAuthServiceReturn<any>> => {
  try {
    const user = await Auth.signIn(email, password);
    console.log('signIn user', user);
    return { status: 'success', data: user };
  } catch (error) {
    return handleError('Error signing in.', error);
  }
};

const confirmSignUp = async (
  email: string,
  code: string,
): Promise<iAuthServiceReturn<any>> => {
  try {
    await Auth.confirmSignUp(email, code);
    return { status: 'success' };
  } catch (error) {
    return handleError('Error confirming sign up.', error);
  }
};

const signOut = async (): Promise<iAuthServiceReturn<any>> => {
  try {
    await Auth.signOut({ global: true }); // "global" signs user out of all devices + invalidates tokens
    return { status: 'success' };
  } catch (error) {
    return handleError('Error signing out.', error);
  }
};

const AuthServices: {
  [key: string]: (...args: any) => Promise<iAuthServiceReturn<any>>;
} = {
  signIn,
  signUp,
  confirmSignUp,
  signOut,
};

export default AuthServices;
