import React, { useLayoutEffect, useState } from 'react';
// @ts-ignore - doesn't have typescript package
import { Authenticator } from 'aws-amplify-react-native';
import { iAuthState } from './types';
import { AuthProvider } from './context';
import SignUp from './SignUp';
import ConfirmSignUp from './ConfirmSignUp';
import ForgotPassword from './ForgotPassword';
import RequireNewPassword from './RequireNewPassword';
import SignIn from './SignIn';
import { useNavigation } from '@react-navigation/native';

const headerTitles: { [key in iAuthState]: string } = {
  signIn: 'Log In',
  signUp: 'Sign Up',
  confirmSignIn: 'Confirm Sign In',
  confirmSignUp: 'Confirm Your Email',
  forgotPassword: 'Forgot Password',
  requireNewPassword: 'Create New Password',
  verifyContact: 'Verify Contact',
  signedIn: 'Signed In',
};

const Auth = () => {
  const navigation = useNavigation();
  const [authState, setAuthState] = useState<iAuthState>('signIn');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitles[authState],
    });
  }, [authState, navigation]);

  return (
    <AuthProvider>
      <Authenticator
        authState={authState}
        hideDefault={true}
        onStateChange={setAuthState}
        validAuthStates={['signedIn']}
      >
        {authState === 'signIn' ? <SignIn /> : <></>}
        {authState === 'signUp' ? <SignUp /> : <></>}
        {authState === 'confirmSignUp' ? <ConfirmSignUp /> : <></>}
        {authState === 'forgotPassword' ? <ForgotPassword /> : <></>}
        {authState === 'requireNewPassword' ? <RequireNewPassword /> : <></>}
      </Authenticator>
    </AuthProvider>
  );
};

export default Auth;
