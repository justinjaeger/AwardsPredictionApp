import React, { useState } from 'react';
// @ts-ignore - doesn't have typescript package
import { Authenticator } from 'aws-amplify-react-native';
import { iAuthState } from './types';
import { AuthProvider } from './context';
import { Text } from '@ui-kitten/components';
import SignUp from './SignUp';
import ConfirmSignUp from './ConfirmSignUp';
import ForgotPassword from './ForgotPassword';
import RequireNewPassword from './RequireNewPassword';
import SignIn from './SignIn';
import { SafeAreaView } from 'react-native';
import { IconButton } from '../../components/IconButton';
import { useNavigation } from '@react-navigation/native';

const Auth = () => {
  const { goBack } = useNavigation();

  const [authState, setAuthState] = useState<iAuthState>('signIn'); // default vlaue keeps resetting

  return (
    <AuthProvider>
      <SafeAreaView>
        <Text>I am a header</Text>
        <IconButton
          iconName="arrow-ios-back-outline"
          onPress={goBack}
          iconStyles={{ color: 'blue', width: 20, height: 30 }}
          styles={{ backgroundColor: 'red', width: 20, height: 30 }}
        />
      </SafeAreaView>
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
        {authState === 'signedIn' ? <Text>You are signed in</Text> : <></>}
      </Authenticator>
    </AuthProvider>
  );
};

export default Auth;
