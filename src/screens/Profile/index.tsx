import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { SubmitButton, TouchableText } from '../../components/Buttons';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';
import { logoutUser } from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../store';
import { useNavigation } from '@react-navigation/native';
import { Body } from '../../components/Text';
import { User } from '../../models';
import { DataStore } from 'aws-amplify';

const Profile = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, userEmail, userId } = useAuth();
  const navigation = useNavigation();

  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // TODO: what we actually need to do is subscribe to the user's data, because if we change the username, this object doesn't update (since userId doesn't change ever)
    // we could potentially put the user / subscribing to the user at some top-level component
    if (userId) {
      DataStore.query(User, userId).then((u) => {
        setUser(u);
      });
    }
  }, [userId]);

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
        <SubmitButton text={userEmail ? 'Log in' : 'Create Account'} onPress={logIn} />
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
