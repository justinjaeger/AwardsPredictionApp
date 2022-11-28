import React, { createContext, useContext, useState } from 'react';
import { useAsyncEffect } from '../util/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

/** Async Storage Functions (to persist data when user closes app)
 * We're not exporting the async functions because we ONLY want to use them in here, or else syncing persisted state with this context is annoying
 * The purpose of this is to keep this context in sync with the async storage for the user's login info
 */

enum AsyncStorageKeys {
  USER_ID = 'userId',
  USER_EMAIL = 'userEmail',
}

const asyncStorageSignIn = async (userId: string, email: string) => {
  await AsyncStorage.setItem(AsyncStorageKeys.USER_ID, userId);
  await AsyncStorage.setItem(AsyncStorageKeys.USER_EMAIL, email);
};

const asyncStorageSignOut = async () => {
  await AsyncStorage.removeItem(AsyncStorageKeys.USER_ID);
};

const asyncStorageGetUser = async () => {
  const userId = await AsyncStorage.getItem(AsyncStorageKeys.USER_ID);
  const email = await AsyncStorage.getItem(AsyncStorageKeys.USER_EMAIL);
  return { userId, email };
};

/**
 * Lets us get the userId and userEmail synchronously
 */

type iUserContext = {
  userId: string | undefined;
  userEmail: string | undefined;
  signInUser: (id: string, email: string) => void;
  signOutUser: () => void;
};

const UserContext = createContext<iUserContext>({
  userId: undefined,
  userEmail: undefined,
  signInUser: () => {},
  signOutUser: () => {},
});

export const UserProvider = (props: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string>();
  const [userEmail, setUserEmail] = useState<string>();

  useAsyncEffect(async () => {
    const { userId, email } = await asyncStorageGetUser();
    if (userId) {
      setUserId(userId);
    }
    if (email) {
      setUserEmail(userEmail);
    }
  }, []);

  const signInUser = (id: string, email: string) => {
    setUserId(id);
    setUserEmail(email);
    asyncStorageSignIn(id, email);
  };

  const signOutUser = () => {
    setUserId(undefined);
    asyncStorageSignOut();
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        userEmail,
        signInUser,
        signOutUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
