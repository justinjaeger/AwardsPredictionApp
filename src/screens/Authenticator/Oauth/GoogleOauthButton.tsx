import React from 'react';
import GoogleIcon from '../../../assets/google.svg';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import COLORS from '../../../constants/colors';
import { SubHeaderLight } from '../../../components/Text';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import ApiServices from '../../../services/graphql';
import { UserRole } from '../../../API';
import { useAuth } from '../../../context/UserContext';
import Snackbar from '../../../components/Snackbar';

const GoogleOauthButton = () => {
  const { width } = useWindowDimensions();
  const { signInUser } = useAuth();

  const googleSignIn = async () => {
    try {
      // google modal pops up, we get the user info
      const res = await GoogleSignin.signIn();
      const { email, name } = res.user;
      // see if this user exists
      const { data: getUserRes } = await ApiServices.getUserByEmail(email);
      let dbUser = getUserRes?.userByEmail?.items[0];

      // if user with this email doesn't exist, create the user
      if (!dbUser) {
        const { status, data } = await ApiServices.createUser(
          email,
          UserRole.USER,
          name || undefined,
        );
        const newUser = data?.createUser;
        if (status === 'error' || !newUser) {
          throw new Error('Error creating user');
        }
        dbUser = newUser;
      }
      // dbUser shouldn't be undefined; sign in the user
      signInUser(dbUser.id, dbUser.email, dbUser.role);
    } catch (e) {
      Snackbar.error(JSON.stringify(e) || 'Something went wrong');
      console.error(e);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={{
          height: 60,
          alignSelf: 'center',
          width: Math.min(400, width * 0.8),
          backgroundColor: COLORS.white,
          borderRadius: 200,
          position: 'relative',
        }}
        onPress={() => {
          googleSignIn();
        }}
        activeOpacity={0.9}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: '100%',
            marginTop: -1,
            width: '100%',
          }}
        >
          <View style={{ width: '30%', alignItems: 'center' }}>
            <GoogleIcon width={30} height={60} />
          </View>
          <SubHeaderLight
            style={{
              width: '70%',
              color: COLORS.primary,
            }}
          >
            Sign in with Google
          </SubHeaderLight>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default GoogleOauthButton;
