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
import { MainScreenNavigationProp } from '../../../navigation/types';
import { resetToProfile } from '../../../util/navigationActions';

const AppleOauthButton = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<MainScreenNavigationProp>();
  const { signInUser } = useAuth();

  const onAppleButtonPress = async () => {
    // NOTE: AFTER FIRST LOGIN, THE USER'S INFORMATION MAY NOT BE RETURNED.
    // ON FIRST LOGIN, WILL RECEIVE EMAIL and NAME, THEN SUBSEQUENT LOGINS MAY JUST BE A UUID
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      // ISSUE: https://github.com/invertase/react-native-apple-authentication/issues/293
      // https://developer.apple.com/documentation/authenticationservices/implementing_user_authentication_with_sign_in_with_apple#3546459
      const email = appleAuthRequestResponse.email;
      const oauthId = appleAuthRequestResponse.user; // This is a SPECIAL APPLE ACCOUNT (SAA)
      const firstName = appleAuthRequestResponse.fullName?.givenName || '';
      const lastName = appleAuthRequestResponse.fullName?.familyName || '';
      const name = firstName + ' ' + lastName;

      if (!oauthId) {
        throw new Error('No oauthId found');
      }

      // REQUESTING existing credentials
      // https://developer.apple.com/documentation/authenticationservices/implementing_user_authentication_with_sign_in_with_apple#3546460

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState !== appleAuth.State.AUTHORIZED) {
        throw new Error('Apple signin is unauthorized');
      }

      // Get user from DB based on oauthId
      // attempt to get user with the oauthId apple sent back
      const { data: getUserRes } = await ApiServices.getUserByOauthId(oauthId);
      let dbUser = getUserRes?.userByOauthId?.items[0];

      // if user with this email doesn't exist, create the user
      if (!dbUser) {
        if (!email) {
          throw new Error('No email found, cannot create user');
        }
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
        dbUser = newUser;
      }
      // dbUser shouldn't be undefined; sign in the user
      signInUser(dbUser.id, dbUser.email, dbUser.role);
      navigation.dispatch(resetToProfile);
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
