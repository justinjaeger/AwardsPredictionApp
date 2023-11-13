import React, { createContext, useContext, useEffect, useState } from 'react';
import KeychainStorage from '../services/keychain';
import * as EndAllSessionsEventEmitter from '../util/endSessionsEventEmitter';
import { useNavigation } from '@react-navigation/native';
import { MainScreenNavigationProp } from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageKeys } from '../types/keys';
import { useAsyncEffect } from '../util/hooks';
import { resetToProfile } from '../util/navigationActions';
import MongoApi from '../services/api/requests';
import { UserRole } from '../types/api';

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
  role?: UserRole;
};

type iVerificationCode =
  | {
      code: string;
      expTime: Date;
    }
  | undefined;

type iAuthContext = {
  userId: string | undefined;
  userEmail: string | undefined;
  userRole: UserRole | undefined;
  signInUser: (userInfo: iUserInfo) => void;
  signOutUser: () => void;
  signOutAllDevices: () => void;
  verificationCode: iVerificationCode;
  generateVerificationCode: () => string | undefined;
  validateVerificationCode: (c: string) => void;
  isLoadingAuth: boolean;
  isNewUser: boolean;
};

const AuthContext = createContext<iAuthContext>({
  userId: undefined,
  userEmail: undefined,
  userRole: undefined,
  signInUser: () => {},
  signOutUser: () => {},
  signOutAllDevices: () => {},
  verificationCode: undefined,
  generateVerificationCode: () => undefined,
  validateVerificationCode: () => ({ isValid: false }),
  isLoadingAuth: false,
  isNewUser: true,
});

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const navigation = useNavigation<MainScreenNavigationProp>();

  const [userInfo, setUserInfo] = useState<iUserInfo | undefined>(undefined);
  const [verificationCode, setVerificationCode] = useState<iVerificationCode>(undefined);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  // On initial load, checks if user is new
  useAsyncEffect(async () => {
    // Load user info
    const userInfoStr = await AsyncStorage.getItem(AsyncStorageKeys.USER_INFO);
    const authUserInfo = userInfoStr ? JSON.parse(userInfoStr) : undefined;
    if (authUserInfo) {
      setUserInfo(authUserInfo);
    }

    // Load other info
    const isNotFirstTime = await AsyncStorage.getItem(AsyncStorageKeys.IS_NOT_FIRST_TIME);
    setIsNewUser(isNotFirstTime !== 'true');
  }, []);

  // Attach event listener that can be emitted to end all user sessions if JWT appears to be invalid
  useEffect(() => {
    // ends all sessions from user with this userId
    const endAllSessions = async () => {
      console.error('ending all sessions...');
      signOutAllDevices();
      resetAuth();
    };

    // attach event listener
    EndAllSessionsEventEmitter.listen(() => endAllSessions());

    return () => {
      EndAllSessionsEventEmitter.remove();
    };
  }, []);

  const onSignInError = (e: string) => {
    resetAuth();
    console.error(e);
  };

  // creates the access+refresh tokens and stores them in keychain
  const signInUser = async (userInfo: iUserInfo) => {
    setIsLoadingAuth(true);
    const { userId } = userInfo;
    // CREATE/SET ACCESS TOKEN
    const { data: newAccessToken } = await MongoApi.getAccessToken(userId);
    if (!newAccessToken) {
      return onSignInError('error: getAccessToken failed');
    }
    await KeychainStorage.set(newAccessToken);
    // CREATE/SET REFRESH TOKEN
    const { data: newRefreshToken } = await MongoApi.createRefreshToken();
    if (!newRefreshToken) {
      return onSignInError('error: createRefreshToken failed');
    }
    await KeychainStorage.set(newAccessToken, newRefreshToken);
    // SET USER INFO
    setUserInfo(userInfo);
    // SET IN ASYNC STORAGE (lets us remember whether user has signed in or not)
    AsyncStorage.setItem(AsyncStorageKeys.IS_NOT_FIRST_TIME, 'true');
    AsyncStorage.setItem(AsyncStorageKeys.USER_INFO, JSON.stringify(userInfo));
    setIsLoadingAuth(false);
    // NAVIGATE TO PROFILE
    navigation.dispatch(resetToProfile);
  };

  const resetAuth = async () => {
    await KeychainStorage.remove();
    setUserInfo(undefined);
    setIsLoadingAuth(false);
    await AsyncStorage.removeItem(AsyncStorageKeys.USER_INFO);
    navigation.navigate('AuthenticatorNavigator');
  };

  // signs out user on a single device
  const signOutUser = async () => {
    console.error('signOutUser');
    setIsLoadingAuth(true);
    const { data: payload } = await KeychainStorage.get();
    const { refreshToken } = payload || {};
    // delete refresh token from db
    if (refreshToken) {
      await MongoApi.removeToken(refreshToken);
    }
    resetAuth();
  };

  // signs out user on all devices
  const signOutAllDevices = async () => {
    console.error('signOutAllDevices');
    setIsLoadingAuth(true);
    await MongoApi.removeUserTokens();
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
    <AuthContext.Provider
      value={{
        userId: userInfo?.userId,
        userEmail: userInfo?.email,
        userRole: userInfo?.role,
        signInUser,
        signOutUser,
        signOutAllDevices,
        verificationCode,
        generateVerificationCode,
        validateVerificationCode,
        isLoadingAuth,
        isNewUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
