import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { iAuthScreenProps, iAuthState } from './types';
import FormInput from '../../components/Inputs/FormInput';
import PasswordInput from '../../components/Inputs/PasswordInput';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import AuthServices from '../../services/auth';
import { useAuthenticator } from './context';
import { EvaStatus } from '@ui-kitten/components/devsupport';

const SignUp = (p: any) => {
  const props = p as iAuthScreenProps; // typecasting because props are automatically passed from Authenticator
  const {
    email: contextEmail,
    setEmail: setContextEmail,
    setPassword: setContextPassword,
    setUsername: setContextUsername,
  } = useAuthenticator();

  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>(contextEmail || '');
  const [username, setUsername] = useState<string>('');
  const [emailStatus, setEmailStatus] = useState<EvaStatus | undefined>(undefined);
  const [usernameStatus, setUsernameStatus] = useState<EvaStatus | undefined>(undefined);
  const [passwordStatus, setPasswordStatus] = useState<EvaStatus | undefined>(undefined);

  const validPassword = password.length >= 8;
  const validUsername = username.length >= 8;
  const validEmail = email.length > 0 && email.includes('.') && email.includes('@');

  const navigate = (authState: iAuthState) => {
    props.onStateChange(authState, {});
  };

  const signUp = () => {
    setContextEmail(email);
    setContextUsername(username);
    AuthServices.signUp(email, password).then((res) => {
      if (res.status === 'success') {
        setContextPassword(password); // important: password should be filled out for this step
        navigate('confirmSignUp');
      }
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, width: '75%' }}
    >
      <FormInput
        label="Email"
        value={email}
        setValue={setEmail}
        textContentType="emailAddress"
        status={emailStatus}
        caption={emailStatus === 'danger' ? 'Not a valid email address' : ''}
        onBlur={() => {
          if (email.length > 0 && !validEmail) {
            setEmailStatus('danger');
          } else {
            setEmailStatus(undefined);
          }
        }}
      />
      <FormInput
        label="Username"
        value={username}
        setValue={setUsername}
        caption={
          usernameStatus === 'danger'
            ? 'Must contain at least 8 characters. \nOnly lowercase letters, numbers, underscores, and periods.'
            : 'Only lowercase letters, numbers, underscores, and periods.'
        }
        textContentType="username"
        status={usernameStatus}
        onBlur={() => {
          if (username.length > 0 && !validUsername) {
            setUsernameStatus('danger');
          } else {
            setUsernameStatus(undefined);
          }
        }}
      />
      <PasswordInput
        value={password}
        setValue={setPassword}
        status={passwordStatus}
        caption={passwordStatus === 'danger' ? 'Must contain at least 8 characters.' : ''}
        onBlur={() => {
          if (password.length > 0 && !validPassword) {
            setPasswordStatus('danger');
          } else {
            setPasswordStatus(undefined);
          }
        }}
      />
      <SubmitButton text={'Go to sign in'} onPress={() => navigate('signIn')} />
      <SubmitButton
        text={'Enter confirmation code'}
        onPress={() => navigate('confirmSignUp')}
      />
      <SubmitButton
        text={'Sign Up'}
        onPress={signUp}
        disabled={!validPassword || !validUsername || !validEmail}
      />
    </ScrollView>
  );
};

export default SignUp;
