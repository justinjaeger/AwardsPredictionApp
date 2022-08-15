import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { iAuthScreenProps, iAuthState } from './types';
import FormInput from '../../components/Inputs/FormInput';
import { SubmitButton, TouchableText } from '../../components/Buttons';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';
import { useAuthenticator } from './context';

const RequireNewPassword = (p: any) => {
  const props = p as iAuthScreenProps; // typecasting because props are automatically passed from Authenticator
  const { email } = useAuthenticator();

  const [code, setCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    // somehow get the code from url slug or something?
    // also, maybe get the email from the previous page?
  }, []);

  const navigate = (authState: iAuthState) => {
    props.onStateChange(authState, {});
  };

  const submit = () => {
    if (!email) {
      return Snackbar.error('Oops! Something went wrong');
    }
    AuthServices.forgotPasswordSubmit(email, code, password).then((res) => {
      if (res.status === 'success') {
        Snackbar.success(`Confirm the email we sent to ${email}`);
      }
    });
  };

  return (
    <View style={{ width: '100%' }}>
      <FormInput label="New Password" value={password} setValue={setPassword} />
      <FormInput label="Code" value={code} setValue={setCode} />
      <SubmitButton text={'Submit'} onPress={submit} />
      <TouchableText
        text={'Go to sign up'}
        onPress={() => navigate('signUp')}
        style={{ marginTop: 30 }}
      />
    </View>
  );
};

export default RequireNewPassword;
