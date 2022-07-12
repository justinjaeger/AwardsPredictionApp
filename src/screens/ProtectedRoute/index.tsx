import React, { useState } from 'react';
// @ts-ignore - doesn't have typescript package
import { Authenticator } from 'aws-amplify-react-native';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { iAuthState } from './types';
import ForgotPassword from './ForgotPassword';
import RequireNewPassword from './RequireNewPassword';
import ConfirmSignUp from './ConfirmSignUp';

/**
 * expected behavior is that once we're authenticated (aka when authState === 'signedIn')
 * it will send us to the component passed in as a child to the ProtectedRoute
 */

const AuthWrapper = (props: { component: JSX.Element }) => {
  const { component } = props;
  const [authState, setAuthState] = useState<iAuthState>('signIn');

  return (
    <Authenticator
      authState={authState}
      hideDefault={true}
      onStateChange={setAuthState}
      validAuthStates={['signedIn']}
    >
      {authState === 'signIn' ? <SignIn /> : <></>}
      {authState === 'signUp' ? <SignUp /> : <></>}
      {authState === 'forgotPassword' ? <ForgotPassword /> : <></>}
      {authState === 'requireNewPassword' ? <RequireNewPassword /> : <></>}
      {authState === 'confirmSignUp' ? <ConfirmSignUp /> : <></>}
      {authState === 'signedIn' ? { component } : <></>}
    </Authenticator>
  );
};

const ProtectedRoute = (props: { children: JSX.Element }) => (
  <AuthWrapper component={props.children} />
);

export default ProtectedRoute;
