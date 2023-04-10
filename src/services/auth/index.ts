import { CognitoUser } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import { handleError, iApiResponse } from '../utils';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

const signUp = async (
  email: string,
  password: string,
): Promise<iApiResponse<CognitoUser>> => {
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
    // if user is not confirmed, resend verification code
    if ((error as any)?.code === 'UsernameExistsException') {
      const e: any = error;
      e.message = 'User already exists - Sign in instead!';
      return handleError('Error signing up.', e);
    }
    return handleError('Error signing up.', error);
  }
};

const signIn = async (email: string, password: string): Promise<iApiResponse<any>> => {
  try {
    const user = await Auth.signIn(email, password);
    return { status: 'success', data: user };
  } catch (error) {
    // if user is not confirmed, resend verification code
    if ((error as any)?.code === 'UserNotConfirmedException') {
      return resendSignUp(email);
    }
    return handleError('Error signing in.', error);
  }
};

const resendSignUp = async (email: string): Promise<iApiResponse<any>> => {
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

const confirmSignUp = async (email: string, code: string): Promise<iApiResponse<any>> => {
  try {
    await Auth.confirmSignUp(email, code);
    return { status: 'success' };
  } catch (error) {
    return handleError('Error confirming sign up.', error);
  }
};

const signOut = async (): Promise<iApiResponse<any>> => {
  try {
    await Auth.signOut({ global: true }); // "global" signs user out of all devices + invalidates tokens
    return { status: 'success' };
  } catch (error) {
    return handleError('Error signing out.', error);
  }
};

const forgotPassword = async (email: string): Promise<iApiResponse<any>> => {
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
): Promise<iApiResponse<any>> => {
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
const deleteUser = async (): Promise<iApiResponse<any>> => {
  try {
    await Auth.deleteUser(); // "global" signs user out of all devices + invalidates tokens
    return { status: 'success' };
  } catch (error) {
    return handleError('Error deleting user.', error);
  }
};

const googleSignIn = async (): Promise<iApiResponse<any>> => {
  try {
    await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
    });
    return { status: 'success' };
  } catch (error) {
    return handleError('Error deleting user.', error);
  }
};

const appleSignIn = async (): Promise<iApiResponse<any>> => {
  try {
    await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Apple,
    });
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
  googleSignIn,
  appleSignIn,
};

export default AuthServices;
