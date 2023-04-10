import React, { useEffect } from 'react';
// import AuthServices from '../../../services/auth';
import AppleIcon from '../../../assets/apple.svg';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import COLORS from '../../../constants/colors';
import { SubHeaderLight } from '../../../components/Text';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import Snackbar from '../../../components/Snackbar';
import useGoogleSignIn from './useGoogleSignIn';

const AppleOauthButton = () => {
  const { width } = useWindowDimensions();
  const { signInDb } = useGoogleSignIn();

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
      console.error('appleAuthRequestResponse', appleAuthRequestResponse);
      const userUniqueId = appleAuthRequestResponse.user;
      // 000966.65bcf194fd044478868943a8d873fc89.212

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
        const email = appleAuthRequestResponse.email;
        if (!email) {
          console.error('no email found', email);
          throw new Error('Email not returned from Apple');
        }
        signInDb(email);
        // TODO: Handle default name, but remember only to set it if not already set
        const firstName = appleAuthRequestResponse.fullName?.givenName || '';
        const lastName = appleAuthRequestResponse.fullName?.familyName || '';
        // sign the user in
      }
    } catch (e) {
      Snackbar.error('Something went wrong');
      console.log(e);
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
