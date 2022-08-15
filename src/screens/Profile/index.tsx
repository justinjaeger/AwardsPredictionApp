import React from 'react';
import { ScrollView } from 'react-native';
import { SubmitButton } from '../../components/Buttons';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';
import { logoutUser } from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../store';
import { useNavigation } from '@react-navigation/native';
import { Body } from '../../components/Text';

const Profile = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, hasLoggedInBefore, user } = useAuth();
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
      {!isLoggedIn ? (
        <SubmitButton
          text={hasLoggedInBefore ? 'Log in' : 'Create Account'}
          onPress={logIn}
        />
      ) : (
        <>
          <SubmitButton text={'Log out'} onPress={logOut} />
          <Body>{JSON.stringify(user)}</Body>
        </>
      )}
    </ScrollView>
  );
};

export default Profile;
