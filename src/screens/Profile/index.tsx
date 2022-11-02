import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { SubmitButton, TouchableText } from '../../components/Buttons';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../store';
import { useNavigation } from '@react-navigation/native';
import { Body } from '../../components/Text';
import ApiServices from '../../services/graphql';
import { useSubscriptionEffect } from '../../util/hooks';
import { GetUserQuery } from '../../API';
import { logoutUser } from '../../store/reducers/auth';

const Profile = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, userId, userEmail } = useAuth(); // later import userId
  const navigation = useNavigation();

  const [user, setUser] = useState<GetUserQuery>();
  const [loading, setLoading] = useState<boolean>(false);

  useSubscriptionEffect(async () => {
    if (!userId) return;
    const { data: u } = await ApiServices.getUser(userId);
    if (u) {
      setUser(u);
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
            text={user?.getUser?.username ? 'Change Username' : 'Create Username'}
            onPress={() => {
              navigation.navigate('ChangeUsername', { user });
            }}
          />
          <Body>{JSON.stringify(user)}</Body>
        </>
      )}
    </ScrollView>
  );
};

export default Profile;
