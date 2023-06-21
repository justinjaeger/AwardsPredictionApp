import React, { createContext, useContext, useState } from 'react';
import { useAsyncEffect } from '../util/hooks';
import { UserRole } from '../API';
import JwtService, { iJwtPayload } from '../services/jwt';
import ApiServices from '../services/graphql';
import KeychainStorage from '../services/keychain';

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
  accessToken: string | undefined;
  refreshToken: string | undefined;
  setAccessToken: (token: string) => void;
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
  accessToken: undefined,
  refreshToken: undefined,
  setAccessToken: () => {},
  verificationCode: undefined,
  generateVerificationCode: () => undefined,
  validateVerificationCode: () => ({ isValid: false }),
});

export const UserProvider = (props: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [refreshToken, setRefreshToken] = useState<string | undefined>(undefined);
  const [userInfo, setUserInfo] = useState<iJwtPayload | undefined>(undefined);
  const [verificationCode, setVerificationCode] = useState<iVerificationCode>(undefined);

  // on inital load, we need to replenish userInfo with access tokens from KeychainStorage
  useAsyncEffect(async () => {
    const { data: payload } = await KeychainStorage.get();
    if (payload) {
      setAccessToken(payload.accessToken);
      setRefreshToken(payload.refreshToken);
    }
  }, []);

  // populate user info with the decoded access token
  useAsyncEffect(async () => {
    const { data: payload } = await JwtService.decode(accessToken || '');
    if (payload) {
      setUserInfo(payload);
    } else {
      setUserInfo(undefined);
    }
  }, [accessToken]);

  // sync keychains to the current state of accessToken and refreshToken
  useAsyncEffect(async () => {
    if (accessToken && refreshToken) {
      await KeychainStorage.set(accessToken, refreshToken);
    } else {
      await KeychainStorage.remove();
    }
  }, [accessToken]);

  const signInUser = async (userId: string, email: string, role: UserRole) => {
    const payload: iJwtPayload = { userId, email, role };
    // CREATE ACCESS TOKEN
    const { data: newAccessToken } = await JwtService.createAccessToken(payload);
    setAccessToken(newAccessToken);
    // CREATE REFRESH TOKEN
    const { data: newRefreshToken } = await JwtService.createRefreshToken(payload);
    setRefreshToken(newRefreshToken);
    // SET REFRESH TOKEN IN DB
    if (newRefreshToken) {
      await ApiServices.createRefreshToken(newRefreshToken, userId);
    }
  };

  const signOutUser = async () => {
    // DELETE REFRESH TOKEN FROM DB
    if (refreshToken) {
      await ApiServices.deleteToken(refreshToken || '');
    }
    setAccessToken(undefined);
    setRefreshToken(undefined);
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
        accessToken,
        refreshToken,
        setAccessToken,
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
