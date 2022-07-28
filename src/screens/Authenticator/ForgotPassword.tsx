import React, { useState } from 'react';
import { Text } from '@ui-kitten/components';
import { ScrollView } from 'react-native';
import { iAuthScreenProps, iAuthState } from './types';
import FormInput from '../../components/Inputs/FormInput';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';
import { useAuthenticator } from './context';

const ForgotPassword = (p: any) => {
  const props = p as iAuthScreenProps; // typecasting because props are automatically passed from Authenticator
  const { email: contextEmail, setEmail: setContextEmail } = useAuthenticator();

  const [email, setEmail] = useState<string>(contextEmail || '');

  const navigate = (authState: iAuthState) => {
    props.onStateChange(authState, {});
  };

  const submit = () => {
    setContextEmail(email);
    AuthServices.forgotPassword(email).then((res) => {
      if (res.status === 'success') {
        Snackbar.success(`Confirm the email we sent to ${email}`);
      }
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, width: '75%' }}
    >
      <Text>Reset your password</Text>
      <FormInput
        label="Email"
        value={email}
        setValue={setEmail}
        textContentType="emailAddress"
      />
      <SubmitButton text={'Go to sign up'} onPress={() => navigate('signUp')} />
      <SubmitButton text={'Submit'} onPress={submit} />
    </ScrollView>
  );
};

export default ForgotPassword;
