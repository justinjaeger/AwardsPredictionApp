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
  console.error(message, JSON.stringify(error));
  const m = error.message || message;
  Snackbar.error(m || '');
  return { status: 'error', message: m, error: error.name };
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
    return { status: 'success', data: user };
  } catch (error: any) {
    // if user is not confirmed, resend verification code
    if (error.code === 'UserNotConfirmedException') {
      return resendSignUp(email);
    }
    return handleError('Error signing in.', error);
  }
};

const resendSignUp = async (email: string): Promise<iAuthServiceReturn<any>> => {
  try {
    await Auth.resendSignUp(email);
    return {
      status: 'success',
      message: 'A verification code has been sent to your email',
    };
  } catch (error) {
    return handleError('Error resending verification code.', error);
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

const forgotPassword = async (email: string): Promise<iAuthServiceReturn<any>> => {
  try {
    await Auth.forgotPassword(email);
    return { status: 'success' };
  } catch (error) {
    return handleError('Error sending password reset.', error);
  }
};

const forgotPasswordSubmit = async (
  email: string,
  code: string,
  password: string,
): Promise<iAuthServiceReturn<any>> => {
  try {
    await Auth.forgotPasswordSubmit(email, code, password);
    return { status: 'success' };
  } catch (error) {
    return handleError(
      'Error submitting password. Double check confirmation code.',
      error,
    );
  }
};

// only for edge cases where something went wrong. careful using this
const deleteUser = async (): Promise<iAuthServiceReturn<any>> => {
  try {
    await Auth.deleteUser(); // "global" signs user out of all devices + invalidates tokens
    return { status: 'success' };
  } catch (error) {
    return handleError('Error deleting user.', error);
  }
};

const AuthServices = {
  signUp,
  signIn,
  confirmSignUp,
  signOut,
  forgotPassword,
  forgotPasswordSubmit,
  resendSignUp,
  deleteUser,
};

export default AuthServices;
