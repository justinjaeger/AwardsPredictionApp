import React, { useLayoutEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Snackbar from '../../components/Snackbar';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { BodyBold } from '../../components/Text';
import { PredictionsNavigationProp } from '../../navigation/types';

const useProfileHeader = (
  userId: string | undefined,
  isLoading: boolean,
  setIsLoading: (l: boolean) => void,
) => {
  const navigation = useNavigation<PredictionsNavigationProp>();
  const { userId: authUserId, signOutUser } = useAuth();

  const isAuthUser = userId && userId === authUserId;

  const logOut = async () => {
    setIsLoading(true);
    await signOutUser();
    Snackbar.success('You were signed out');
    setIsLoading(false);
  };

  // put the logout button in the top right corner
  useLayoutEffect(() => {
    if (!userId) return;
    navigation.setOptions({
      // don't set logout header if someone else's profile
      headerRight:
        isAuthUser && !isLoading
          ? () => (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert('Log out', 'Are you sure you want to log out?', [
                    {
                      text: 'Cancel',
                      onPress: () => {},
                      style: 'cancel',
                    },
                    {
                      text: 'Yes',
                      onPress: () => {
                        logOut();
                      },
                    },
                  ]);
                }}
              >
                <BodyBold style={{ color: 'rgba(255,255,255,0.5)', marginRight: 10 }}>
                  Log out
                </BodyBold>
              </TouchableOpacity>
            )
          : () => <></>,
    });
  }, [userId, isLoading, isAuthUser]);
};

export default useProfileHeader;
