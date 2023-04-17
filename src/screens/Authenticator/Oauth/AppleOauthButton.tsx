import React, { useEffect } from 'react';
import AppleIcon from '../../../assets/apple.svg';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import COLORS from '../../../constants/colors';
import { SubHeaderLight } from '../../../components/Text';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import Snackbar from '../../../components/Snackbar';
import ApiServices from '../../../services/graphql';
import { UserRole } from '../../../API';
import { useAuth } from '../../../context/UserContext';
import { useNavigation } from '@react-navigation/native';

const AppleOauthButton = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const { signInUser } = useAuth();

  const onAppleButtonPress = async () => {
    // NOTE: AFTER FIRST LOGIN, THE USER'S INFORMATION WILL NOT BE RETURNED.
    // ON FIRST LOGIN, WILL RECEIVE EMAIL and NAME, THEN SUBSEQUENT LOGINS ARE JUST A UUID
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      const oauthId = appleAuthRequestResponse.user;
      if (!oauthId) {
        throw new Error('No oauthId found');
      }

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState !== appleAuth.State.AUTHORIZED) {
        throw new Error('Apple signin is unauthorized');
      }

      // Important: The user's email and name ONLY comes back on the first login
      // So if they exist, we assume it's the first time they're logging in
      // If not, we have to identify them by their oauthId
      const email = appleAuthRequestResponse.email;
      // If email is returned assume it's the first time they're logging in, and create a new user
      if (email) {
        const firstName = appleAuthRequestResponse.fullName?.givenName || '';
        const lastName = appleAuthRequestResponse.fullName?.familyName || '';
        const name = firstName + ' ' + lastName;
        const { status, data } = await ApiServices.createUser(
          email,
          UserRole.USER,
          name,
          oauthId,
        );
        const newUser = data?.createUser;
        if (status === 'error' || !newUser) {
          throw new Error('Error creating user');
        }
        signInUser(newUser.id, newUser.email, newUser.role);
        navigation.navigate('BottomTabNavigator', {
          screen: 'Profile',
          params: { screen: 'UpdateProfileInfo' },
        });
      } else {
        // If not, assume it's not first time signing in and attempt to find user by oauthId
        const { data: getUserRes } = await ApiServices.getUserByOauthId(oauthId);
        const dbUser = getUserRes?.searchUsers?.items[0];
        if (!dbUser) {
          throw new Error('Error finding user');
        }
        signInUser(dbUser.id, dbUser.email, dbUser.role);
        navigation.navigate('BottomTabNavigator', {
          screen: 'Profile',
        });
      }
    } catch (e) {
      Snackbar.error(JSON.stringify(e) || 'Something went wrong');
      console.error(e);
    }
  };

  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn('If this function executes, User Credentials have been Revoked');
    });
  }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.

  return (
    <>
      <TouchableOpacity
        style={{
          marginTop: 20,
          height: 60,
          alignSelf: 'center',
          width: Math.min(400, width * 0.8),
          backgroundColor: COLORS.white,
          borderRadius: 200,
          position: 'relative',
        }}
        onPress={() => {
          onAppleButtonPress();
          //   AuthServices.appleSignIn();
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
            <AppleIcon width={55} height={55} />
          </View>
          <SubHeaderLight
            style={{
              width: '70%',
              color: COLORS.primary,
            }}
          >
            Sign in with Apple
          </SubHeaderLight>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default AppleOauthButton;
