import * as Keychain from 'react-native-keychain';
import { handleError, iApiResponse } from '../utils';

export type iVerificationCodePayload = { code: string; expiresAt: Date };

const KEYCHAIN_KEY_NAME = 'verificationCode';

/**
 * Note: We use same Keychain storage for access tokens,
 * but this is okay because if they're trying to get a verification code,
 * they aren't authenticated, so no overlap
 */

const set = async (code: string): Promise<iApiResponse<any>> => {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 20);
  const keychainPayload: iVerificationCodePayload = { code, expiresAt };
  try {
    await Keychain.setGenericPassword(KEYCHAIN_KEY_NAME, JSON.stringify(keychainPayload));
    return { status: 'success' };
  } catch (error) {
    return handleError('Error storing verification code credentials', error);
  }
};

const verify = async (code: string): Promise<iApiResponse<{ message: string }>> => {
  try {
    // Retrieve the credentials
    const keychainRes = await Keychain.getGenericPassword();
    if (!keychainRes) {
      return { status: 'error', message: 'no link saved in keychain' };
    }
    // parse the code and check it against the passed-in code
    const stringifiedPayload = keychainRes?.password;
    const { code: storedCode, expiresAt } = (JSON.parse(stringifiedPayload) ||
      {}) as iVerificationCodePayload;
    // verify that link is not expired
    if (new Date(expiresAt) < new Date()) {
      return { status: 'error', message: 'link expired' };
    }
    if (storedCode !== code) {
      return { status: 'error', message: 'invalid link' };
    }
    return { status: 'success' };
  } catch (error) {
    return handleError('Error getting verification code credentials', error);
  }
};

const remove = async (): Promise<iApiResponse<any>> => {
  try {
    await Keychain.resetGenericPassword();
    return { status: 'success' };
  } catch (error) {
    return handleError('Error removing verification code credentials', error);
  }
};

const VerificationCodeStorage = {
  verify,
  set,
  remove,
};

export default VerificationCodeStorage;
