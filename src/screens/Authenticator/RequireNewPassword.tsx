import React, { useState } from 'react';
import { View } from 'react-native';
import { iAuthScreenProps, iAuthState } from './types';
import FormInput from '../../components/Inputs/FormInput';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';
import { useAuthenticator } from './context';
import { SubmitButton, TouchableText } from '../../components/Buttons';

const RequireNewPassword = (p: any) => {
  const props = p as iAuthScreenProps; // typecasting because props are automatically passed from Authenticator
  const { email } = useAuthenticator();

  const [code, setCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = (authState: iAuthState) => {
    props.onStateChange(authState, {});
  };

  const submit = () => {
    if (!email) {
      return Snackbar.error('Oops! Something went wrong');
    }
    setLoading(true);
    AuthServices.forgotPasswordSubmit(email, code, password).then((res) => {
      if (res.status === 'success') {
        Snackbar.success(`Confirm the email we sent to ${email}`);
      }
      setLoading(false);
    });
  };

  return (
    <View style={{ width: '100%' }}>
      <FormInput label="New Password" value={password} setValue={setPassword} />
      <FormInput label="Code" value={code} setValue={setCode} />
      <SubmitButton text={'Submit'} onPress={submit} loading={loading} />
      <TouchableText
        text={'Go to sign up'}
        onPress={() => navigate('signUp')}
        style={{ marginTop: 30 }}
      />
    </View>
  );
};

export default RequireNewPassword;
