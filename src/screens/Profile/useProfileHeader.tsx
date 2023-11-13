import React, { useLayoutEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Snackbar from '../../components/Snackbar';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useTypedNavigation } from '../../util/hooks';
import BackButton from '../../components/Buttons/BackButton';
import { PredictionsParamList } from '../../navigation/types';
import { BodyBold } from '../../components/Text';

const useProfileHeader = (
  userId: string | undefined,
  isLoading: boolean,
  setIsLoading: (l: boolean) => void,
) => {
  const globalNavigation = useNavigation();
  const navigation = useTypedNavigation<PredictionsParamList>();
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
    // helps NOT render a back arrow on root profile
    const isFirstProfile =
      globalNavigation
        .getState()
        .routes.map((r) => r.name)
        .filter((r) => r === 'Profile').length === 1;

    if (!userId) return;
    navigation.setOptions({
      headerLeft:
        navigation.canGoBack() && (!isFirstProfile || !isAuthUser)
          ? () => <BackButton />
          : null,
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
          : null,
    });
  }, [userId, isLoading]);
};

export default useProfileHeader;
