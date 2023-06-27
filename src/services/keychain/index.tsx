import * as Keychain from 'react-native-keychain';
import { handleError, iApiResponse } from '../utils';
import KeychainEventEmitter from '../../util/keychainEventEmitter';

export type iKeychainPayload = { accessToken: string; refreshToken: string };

const KEYCHAIN_KEY_NAME = 'awardExpertToken';

const set = async (
  accessToken: string,
  refreshToken: string,
): Promise<iApiResponse<any>> => {
  KeychainEventEmitter.emit();
  const keychainPayload: iKeychainPayload = { accessToken, refreshToken };
  try {
    await Keychain.setGenericPassword(KEYCHAIN_KEY_NAME, JSON.stringify(keychainPayload));
    return { status: 'success' };
  } catch (error) {
    return handleError('Error storing keychain credentials', error);
  }
};

const get = async (): Promise<iApiResponse<iKeychainPayload>> => {
  try {
    // Retrieve the credentials
    const keychainRes = await Keychain.getGenericPassword();
    if (!keychainRes) {
      return { status: 'success', data: undefined };
    }
    const stringifiedPayload = keychainRes?.password;
    const keychainPayload = JSON.parse(stringifiedPayload) as iKeychainPayload;
    return { status: 'success', data: keychainPayload };
  } catch (error) {
    return handleError('Error getting keychain credentials', error);
  }
};

const remove = async (): Promise<iApiResponse<any>> => {
  try {
    await Keychain.resetGenericPassword();
    return { status: 'success' };
  } catch (error) {
    return handleError('Error removing keychain credentials', error);
  }
};

const KeychainStorage = {
  get,
  set,
  remove,
};

export default KeychainStorage;
