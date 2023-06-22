import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserRole } from '../API';
import JwtService, { iJwtPayload } from '../services/jwt';
import ApiServices from '../services/graphql';
import KeychainStorage from '../services/keychain';
import KeychainEventEmitter from '../util/keychainEventEmitter';

/** Async Storage Functions (to persist data when user closes app)
 * We're not exporting the async functions because we ONLY want to use them in here, or else syncing persisted state with this context is annoying
 * The purpose of this is to keep this context in sync with the async storage for the user's login info
 */

/**
 * Lets us get the userId and userEmail synchronously
 */

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
  signInUser: (id: string, email: string, role: UserRole) => void;
  signOutUser: () => void;
  verificationCode: iVerificationCode;
  generateVerificationCode: () => string | undefined;
  validateVerificationCode: (c: string) => void;
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
});

export const UserProvider = (props: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<iJwtPayload | undefined>(undefined);
  const [verificationCode, setVerificationCode] = useState<iVerificationCode>(undefined);

  // On initial load, populates user info if is stored in keychain
  // attaches event listener that fires whenever KeychainStorage is modified
  useEffect(() => {
    const callback = async () => {
      console.error('KEYCHAIN EVENT EMITTER FIRED');
      const { data: payload } = await KeychainStorage.get();
      // sign out the user if there's no payload / no tokens stored
      if (!payload) {
        return signOutUser();
      }
      // read the token & set user info
      const { accessToken, refreshToken } = payload || {};
      const { data } = await JwtService.verifyOrRefresh(accessToken, refreshToken);
      if (!data) {
        return signOutUser();
      }
      const userInfo = data.payload;
      setUserInfo(userInfo);
    };

    // attach event listener
    KeychainEventEmitter.listen(callback);

    // on initial load we want to get the user data from the keychain/token
    KeychainEventEmitter.emit();

    return () => {
      KeychainEventEmitter.remove();
    };
  }, []);

  const signInUser = async (userId: string, email: string, role: UserRole) => {
    const payload: iJwtPayload = { userId, email, role };
    // CREATE ACCESS TOKEN
    const { data: newAccessToken } = await JwtService.createAccessToken(payload);
    // CREATE REFRESH TOKEN
    const { data: newRefreshToken } = await JwtService.createRefreshToken(payload);
    if (newAccessToken && newRefreshToken) {
      // SET USER INFO
      setUserInfo(payload);
      // SET IN KEYCHAIN
      KeychainStorage.set(newAccessToken, newRefreshToken);
      // SET REFRESH TOKEN IN DB
      if (newRefreshToken) {
        await ApiServices.createRefreshToken(newRefreshToken, userId);
      }
    }
  };

  const signOutUser = async () => {
    const { data: payload } = await KeychainStorage.get();
    const { refreshToken } = payload || {};
    // DELETE REFRESH TOKEN FROM DB
    if (refreshToken) {
      await ApiServices.deleteToken(refreshToken || '');
    }
    setUserInfo(undefined);
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
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
