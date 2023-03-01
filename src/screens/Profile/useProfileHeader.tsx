import React, { useLayoutEffect } from 'react';
import { Alert } from 'react-native';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';
import { useAuth } from '../../context/UserContext';
import { IconButton } from '../../components/Buttons/IconButton';
import { useNavigation } from '@react-navigation/native';
import { useTypedNavigation } from '../../util/hooks';
import BackButton from '../../components/Buttons/BackButton';
import { PredictionsParamList } from '../../navigation/types';

const useProfileHeader = (
  userId: string | undefined,
  isLoading: boolean,
  setIsLoading: (l: boolean) => void,
) => {
  const globalNavigation = useNavigation();
  const navigation = useTypedNavigation<PredictionsParamList>();
  const { userId: authUserId, signOutUser } = useAuth();

  const isDeviceProfile = userId && userId === authUserId;

  const logOut = () => {
    setIsLoading(true);
    AuthServices.signOut().then((res) => {
      // sign out in context as well
      if (res.status === 'success') {
        signOutUser();
        Snackbar.success('You were signed out');
      }
      setIsLoading(false);
    });
  };

  // put the logout button in the top right corner
  useLayoutEffect(() => {
    // helps NOT render a back arrow on root profile
    const isFirstProfile =
      globalNavigation
        .dangerouslyGetState()
        .routes.map((r) => r.name)
        .filter((r) => r === 'Profile').length === 1;

    if (!userId) return;
    navigation.setOptions({
      headerLeft: navigation.canGoBack() && !isFirstProfile ? () => <BackButton /> : null,
      // don't set logout header if someone else's profile
      headerRight:
        isDeviceProfile && !isLoading
          ? () => (
              <IconButton
                iconProps={{
                  name: 'log-out-outline',
                }}
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
                styles={{
                  width: 30,
                  height: 30,
                  marginRight: 10,
                }}
              />
            )
          : null,
    });
  }, [userId, isLoading]);
};

export default useProfileHeader;
