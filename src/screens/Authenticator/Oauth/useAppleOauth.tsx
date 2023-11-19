import { useEffect, useState } from 'react';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import Snackbar from '../../../components/Snackbar';
import { useAuth } from '../../../context/AuthContext';
import MongoApi from '../../../services/api/requests';
import useDevice from '../../../util/device';

const useAppleOauth = () => {
  const { isAndroid } = useDevice();
  const { signInUser } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const appleSignIn = async () => {
    // NOTE: AFTER FIRST LOGIN, THE USER'S INFORMATION MAY NOT BE RETURNED.
    // ON FIRST LOGIN, WILL RECEIVE EMAIL and NAME, THEN SUBSEQUENT LOGINS MAY JUST BE A UUID
    // Therefore, we need to reference the Apple user by their oauthId, not their email
    try {
      setIsLoading(true);
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293: https://github.com/invertase/react-native-apple-authentication/issues/293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      // (Handle User Credentials docs) https://developer.apple.com/documentation/authenticationservices/implementing_user_authentication_with_sign_in_with_apple#3546459
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
      const { data: existingUser } = await MongoApi.getUser({ oauthId });
      let dbUser = existingUser;

      // if user with this email doesn't exist, create the user
      if (!dbUser) {
        if (!email) {
          throw new Error('No email found, cannot create user');
        }
        const { status, data: newUser } = await MongoApi.createUser({
          email,
          name,
          oauthId,
        });
        if (status === 'error' || !newUser) {
          throw new Error('Error creating user');
        }
        dbUser = newUser;
      }
      // dbUser shouldn't be undefined; sign in the user
      signInUser({ userId: dbUser._id, email: dbUser.email });
    } catch (e) {
      Snackbar.error(JSON.stringify(e) || 'Something went wrong');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAndroid) {
      return;
    }
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn('If this function executes, User Credentials have been Revoked');
    });
  }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.

  return { appleSignIn, isLoading };
};

export default useAppleOauth;
