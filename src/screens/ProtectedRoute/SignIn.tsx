import React, { useState } from 'react';
import { Text } from '@ui-kitten/components';
import { ScrollView } from 'react-native';
import { iAuthScreenProps } from './types';
import PasswordInput from '../../components/Inputs/PasswordInput';
import FormInput from '../../components/Inputs/FormInput';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';

const SignIn = (p: any) => {
  const props = p as iAuthScreenProps; // typecasting because props are automatically passed from Authenticator

  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const gotoSignUp = () => {
    props.onStateChange('signUp', {});
  };

  const signIn = () => {
    AuthServices.signIn(email, password).then((res) => {
      if (res.status === 'success') {
        // can do something with res.data
        // can delete snackbar success
        Snackbar.success('Signup successful');
      }
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, width: '75%' }}
    >
      <Text>Log in</Text>
      <FormInput label="Email" value={email} setValue={setEmail} />
      <PasswordInput value={password} setValue={setPassword} />
      <SubmitButton text={'Go to sign up'} onPress={gotoSignUp} />
      <SubmitButton text={'Log in'} onPress={signIn} disabled={password.length < 8} />
    </ScrollView>
  );
};

export default SignIn;
