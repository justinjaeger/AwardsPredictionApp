import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { SubmitButton, TouchableText } from '../../components/Buttons';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';
import { logoutUser } from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../store';
import { useNavigation } from '@react-navigation/native';
import { Body } from '../../components/Text';

const Profile = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, storedEmail, user } = useAuth();
  const navigation = useNavigation();

  const [loading, setLoading] = useState<boolean>(false);

  const logIn = () => {
    navigation.navigate('Authenticator');
  };

  const logOut = () => {
    setLoading(true);
    AuthServices.signOut().then((res) => {
      // sign out in context as well
      if (res.status === 'success') {
        dispatch(logoutUser());
        Snackbar.success('You were signed out');
      }
      setLoading(false);
    });
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', marginTop: 40 }}>
      {!isLoggedIn ? (
        <SubmitButton text={storedEmail ? 'Log in' : 'Create Account'} onPress={logIn} />
      ) : (
        <>
          <SubmitButton text={'Log out'} onPress={logOut} loading={loading} />
          <TouchableText
            text={user?.username ? 'Change Username' : 'Create Username'}
            onPress={() => {
              navigation.navigate('ChangeUsername');
            }}
          />
          <Body>{JSON.stringify(user)}</Body>
        </>
      )}
    </ScrollView>
  );
};

export default Profile;
