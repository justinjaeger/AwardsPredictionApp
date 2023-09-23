import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserRole } from '../API';
import KeychainStorage from '../services/keychain';
import * as EndAllSessionsEventEmitter from '../util/endSessionsEventEmitter';
import { useNavigation } from '@react-navigation/native';
import { MainScreenNavigationProp } from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageKeys } from '../types';
import { useAsyncEffect } from '../util/hooks';
import { resetToProfile } from '../util/navigationActions';
import AMPLIFY_CONFIG from '../../amplify/.config/local-env-info.json';
import MongoApi from '../services/api/requests';

/** Async Storage Functions (to persist data when user closes app)
 * We're not exporting the async functions because we ONLY want to use them in here, or else syncing persisted state with this context is annoying
 * The purpose of this is to keep this context in sync with the async storage for the user's login info
 */

/**
 * Lets us get the userId and userEmail synchronously
 */

export type iUserInfo = {
  userId: string;
  email: string;
  role: UserRole;
};

type iVerificationCode =
  | {
      code: string;
      expTime: Date;
    }
  | undefined;

type iUserContext = {
  userId: string | undefined;
  userEmail: string | undefined;
  userRole: UserRole | undefined;
  signInUser: (userInfo: iUserInfo) => void;
  signOutUser: () => void;
  verificationCode: iVerificationCode;
  generateVerificationCode: () => string | undefined;
  validateVerificationCode: (c: string) => void;
  isLoadingAuth: boolean;
  isNewUser: boolean;
  amplifyEnv: 'dev' | 'prod';
};

const UserContext = createContext<iUserContext>({
  userId: undefined,
  userEmail: undefined,
  userRole: undefined,
  signInUser: () => {},
  signOutUser: () => {},
  verificationCode: undefined,
  generateVerificationCode: () => undefined,
  validateVerificationCode: () => ({ isValid: false }),
  isLoadingAuth: false,
  isNewUser: true,
  amplifyEnv: 'prod', // important that it defaults to prod just in case
});

// wraps the main navigator so pretty top level
export const UserProvider = (props: { children: React.ReactNode }) => {
  const navigation = useNavigation<MainScreenNavigationProp>();

  const [userInfo, setUserInfo] = useState<iUserInfo | undefined>(undefined);
  const [verificationCode, setVerificationCode] = useState<iVerificationCode>(undefined);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [amplifyEnv] = useState<'dev' | 'prod'>(
    AMPLIFY_CONFIG.envName === 'dev' ? 'dev' : 'prod',
  );

  // On initial load, checks if user is new
  useAsyncEffect(async () => {
    const isNotFirstTime = await AsyncStorage.getItem(AsyncStorageKeys.IS_NOT_FIRST_TIME);
    setIsNewUser(isNotFirstTime !== 'true');
  }, []);

  // Attach event listener that can be emitted to end all user sessions if JWT appears to be invalid
  useEffect(() => {
    // ends all sessions from user with this userId
    const endAllSessions = async () => {
      console.error('ending all sessions...');
      setIsLoadingAuth(true);
      if (userInfo?.userId) {
        await MongoApi.removeToken({ userId: userInfo?.userId });
      }
      resetAuth();
    };

    // attach event listener
    EndAllSessionsEventEmitter.listen(() => endAllSessions());

    return () => {
      EndAllSessionsEventEmitter.remove();
    };
  }, []);

  // creates the access+refresh tokens and stores them in keychain
  const signInUser = async (userInfo: iUserInfo) => {
    setIsLoadingAuth(true);
    const { userId } = userInfo;
    // CREATE/SET ACCESS TOKEN
    const { data: newAccessToken } = await MongoApi.getAccessToken(userId);
    if (!newAccessToken) {
      return;
    }
    await KeychainStorage.set(newAccessToken);
    // CREATE/SET REFRESH TOKEN
    const { data: newRefreshToken } = await MongoApi.createRefreshToken();
    if (!newRefreshToken) {
      return;
    }
    await KeychainStorage.set(newAccessToken, newRefreshToken);
    // SET USER INFO
    setUserInfo(userInfo);
    // NAVIGATE TO PROFILE
    navigation.dispatch(resetToProfile);
    // SET IN ASYNC STORAGE (lets us remember whether user has signed in or not)
    AsyncStorage.setItem(AsyncStorageKeys.IS_NOT_FIRST_TIME, 'true');
    setIsLoadingAuth(false);
  };

  const resetAuth = async () => {
    await KeychainStorage.remove();
    setUserInfo(undefined);
    setIsLoadingAuth(false);
    navigation.navigate('Authenticator');
  };

  // signs out user on a single device
  const signOutUser = async () => {
    console.error('signOutUser');
    setIsLoadingAuth(true);
    const { data: payload } = await KeychainStorage.get();
    const { refreshToken } = payload || {};
    // delete refresh token from db
    if (refreshToken) {
      await MongoApi.removeToken({ token: refreshToken });
    }
    resetAuth();
  };

  const generateVerificationCode = () => {
    // random string of 12 characters including special characters
    const code = Math.random().toString(36).slice(-12);
    // set a datetime for ten minutes from now
    const expTime = new Date();
    expTime.setMinutes(expTime.getMinutes() + 10);
    setVerificationCode({ code, expTime });
    return code;
  };

  const validateVerificationCode = (
    code: string,
  ): {
    isValid: boolean;
    message?: string;
  } => {
    if (verificationCode?.code !== code) {
      return {
        isValid: false,
        message: 'Invalid verification code',
      };
    }
    if (verificationCode.expTime > new Date()) {
      return {
        isValid: false,
        message: 'Verification code expired',
      };
    }
    return {
      isValid: true,
    };
  };

  return (
    <UserContext.Provider
      value={{
        userId: userInfo?.userId,
        userEmail: userInfo?.email,
        userRole: userInfo?.role,
        signInUser,
        signOutUser,
        verificationCode,
        generateVerificationCode,
        validateVerificationCode,
        isLoadingAuth,
        isNewUser,
        amplifyEnv,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
