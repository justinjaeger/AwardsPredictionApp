import React, { useState } from 'react';
import { Text } from '@ui-kitten/components';
import { ScrollView } from 'react-native';
import { iAuthScreenProps } from './types';
import FormInput from '../../components/Inputs/FormInput';
import PasswordInput from '../../components/Inputs/PasswordInput';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';

const SignUp = (p: any) => {
  const props = p as iAuthScreenProps; // typecasting because props are automatically passed from Authenticator

  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const gotoSignIn = () => {
    props.onStateChange('signIn', {});
  };

  const signUp = () => {
    AuthServices.signUp(email, password).then((res) => {
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
      <Text>Create a new account</Text>
      <FormInput label="Email" value={email} setValue={setEmail} />
      <PasswordInput
        value={password}
        setValue={setPassword}
        caption={'Should contain at least 8 symbols'}
      />
      <SubmitButton text={'Go to sign in'} onPress={gotoSignIn} />
      <SubmitButton text={'Sign Up'} onPress={signUp} disabled={password.length < 8} />
    </ScrollView>
  );
};

export default SignUp;
