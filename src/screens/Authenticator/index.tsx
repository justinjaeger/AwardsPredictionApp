import React, { useEffect, useLayoutEffect, useState } from 'react';
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
import { useAuth } from '../../store';
import { ScrollView, View } from 'react-native';
import COLORS from '../../constants/colors';
import SignedIn from './SignedIn';

const headerTitles: { [key in iAuthState]: string } = {
  signIn: 'Log In',
  signUp: 'Sign Up',
  confirmSignIn: 'Confirm Sign In',
  confirmSignUp: 'Confirm Your Email',
  forgotPassword: 'Reset Password',
  requireNewPassword: 'Create New Password',
  verifyContact: 'Verify Contact',
  signedIn: 'You are signed in!',
};

const Auth = () => {
  const navigation = useNavigation();
  const { userEmail } = useAuth();

  const [authState, setAuthState] = useState<iAuthState>('signIn');

  useLayoutEffect(() => {
    // This is the best way to change the header
    navigation.setOptions({
      headerTitle: headerTitles[authState],
    });
  }, [authState, navigation]);

  useEffect(() => {
    setAuthState(userEmail ? 'signIn' : 'signUp');
  }, [userEmail]);

  return (
    <AuthProvider>
      <ScrollView
        style={{ width: '100%', backgroundColor: COLORS.white }}
        contentContainerStyle={{
          alignItems: 'center',
          marginTop: 40,
          width: '100%',
        }}
      >
        <View style={{ width: '80%' }}>
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
            {authState === 'signedIn' ? <SignedIn /> : <></>}
          </Authenticator>
        </View>
      </ScrollView>
    </AuthProvider>
  );
};

export default Auth;
