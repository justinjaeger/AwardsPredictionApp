import React from 'react';
import { Text } from '@ui-kitten/components';
import { ScrollView } from 'react-native';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';
import { logoutUser } from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../store';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();
  const { navigate } = useNavigation();

  const logIn = () => {
    navigate('Authenticator');
  };

  const logOut = () => {
    AuthServices.signOut().then((res) => {
      // sign out in context as well
      if (res.status === 'success') {
        dispatch(logoutUser());
        Snackbar.success('Successfully signed out');
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', marginTop: 40 }}>
      <Text category={'h1'}>My Profile</Text>
      {!isLoggedIn ? (
        <SubmitButton text={'Log in'} onPress={logIn} />
      ) : (
        <SubmitButton text={'Log out'} onPress={logOut} />
      )}
    </ScrollView>
  );
};

export default Profile;
