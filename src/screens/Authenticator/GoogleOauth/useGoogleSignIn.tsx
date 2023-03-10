import { useNavigation } from '@react-navigation/native';
import { Auth, Hub } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/UserContext';
import ApiServices from '../../../services/graphql';
import { useNavigateAwayEffect } from '../../../util/hooks';

const useGoogleSignIn = () => {
  const navigation = useNavigation();

  const { signInUser } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({ payload: { event } }) => {
      if (event === 'signIn') {
        signIn();
      }
    });
    return unsubscribe;
  }, []);

  // Attempt to sign user in
  const signIn = async () => {
    try {
      setIsLoading(true);
      const authenticatedUser = await Auth.currentAuthenticatedUser();
      const email = authenticatedUser?.attributes?.email;

      if (!email) {
        throw new Error('No email extracted from body');
      }
      // First, attempt to get user from database using email
      const { data: getUserRes } = await ApiServices.getUserByEmail(email);
      const dbUser = getUserRes?.listUsers?.items[0];
      if (dbUser) {
        signInUser(dbUser.id, dbUser.email, dbUser.role);
        navigation.navigate('BottomTabNavigator', {
          screen: 'Profile',
        });
        // navigate somewhere
        return;
      }
      // If user not found, create new user in db
      const { data: createUserRes } = await ApiServices.createUser(email);
      const newUser = createUserRes?.createUser;
      if (!newUser) {
        throw new Error('Could not create user');
      }
      signInUser(newUser.id, newUser.email, newUser.role);
      navigation.navigate('BottomTabNavigator', {
        screen: 'Profile',
        params: { screen: 'UpdateProfileInfo' },
      });
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useNavigateAwayEffect(() => {
    setIsLoading(false);
    setIsError(false);
  }, []);

  return { isLoading, isError };
};

export default useGoogleSignIn;
