import React, { createContext, useContext, useState } from 'react';
import { useAsyncEffect } from '../util/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserRole } from '../API';

/** Async Storage Functions (to persist data when user closes app)
 * We're not exporting the async functions because we ONLY want to use them in here, or else syncing persisted state with this context is annoying
 * The purpose of this is to keep this context in sync with the async storage for the user's login info
 */

enum AsyncStorageKeys {
  USER_ID = 'userId',
  USER_EMAIL = 'userEmail',
  USER_ROLE = 'userRole',
}

const asyncStorageSignIn = async (userId: string, email: string, role: UserRole) => {
  await AsyncStorage.setItem(AsyncStorageKeys.USER_ID, userId);
  await AsyncStorage.setItem(AsyncStorageKeys.USER_EMAIL, email);
  await AsyncStorage.setItem(AsyncStorageKeys.USER_ROLE, role);
};

const asyncStorageSignOut = async () => {
  await AsyncStorage.removeItem(AsyncStorageKeys.USER_ID);
};

const asyncStorageGetUser = async () => {
  const userId = await AsyncStorage.getItem(AsyncStorageKeys.USER_ID);
  const email = await AsyncStorage.getItem(AsyncStorageKeys.USER_EMAIL);
  const role = await AsyncStorage.getItem(AsyncStorageKeys.USER_ROLE);
  return { userId, email, role };
};

/**
 * Lets us get the userId and userEmail synchronously
 */

type iUserContext = {
  userId: string | undefined;
  userEmail: string | undefined;
  userRole: UserRole | undefined;
  signInUser: (id: string, email: string, role: UserRole) => void;
  signOutUser: () => void;
};

const UserContext = createContext<iUserContext>({
  userId: undefined,
  userEmail: undefined,
  userRole: undefined,
  signInUser: () => {},
  signOutUser: () => {},
});

export const UserProvider = (props: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string>();
  const [userEmail, setUserEmail] = useState<string>();
  const [userRole, setUserRole] = useState<UserRole | undefined>(undefined);

  useAsyncEffect(async () => {
    const { userId, email, role } = await asyncStorageGetUser();
    if (userId) {
      setUserId(userId);
    }
    if (email) {
      setUserEmail(userEmail);
    }
    if (role) {
      setUserRole(role as UserRole);
    }
  }, []);

  const signInUser = (id: string, email: string, role: UserRole) => {
    setUserId(id);
    setUserEmail(email);
    setUserRole(role);
    asyncStorageSignIn(id, email, role);
  };

  const signOutUser = () => {
    setUserId(undefined);
    setUserRole(undefined);
    asyncStorageSignOut();
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        userEmail,
        userRole,
        signInUser,
        signOutUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
