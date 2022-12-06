import React, { useState } from 'react';
import { View } from 'react-native';
import { iAuthScreenProps, iAuthState } from './types';
import FormInput from '../../components/Inputs/FormInput';
import { SubmitButton, TouchableText } from '../../components/Buttons';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';
import { useAuthenticator } from './context';
import COLORS from '../../constants/colors';

const ForgotPassword = (p: any) => {
  const props = p as iAuthScreenProps; // typecasting because props are automatically passed from Authenticator
  const { email: contextEmail, setEmail: setContextEmail } = useAuthenticator();

  const [email, setEmail] = useState<string>(contextEmail || '');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = (authState: iAuthState) => {
    props.onStateChange(authState, {});
  };

  const submit = () => {
    setLoading(true);
    setContextEmail(email);
    AuthServices.forgotPassword(email).then((res) => {
      if (res.status === 'success') {
        Snackbar.success(`Confirm the email we sent to ${email}`);
      }
      setLoading(false);
    });
  };

  return (
    <View style={{ width: '100%', backgroundColor: COLORS.primary }}>
      <FormInput
        label="Email"
        value={email}
        setValue={setEmail}
        textContentType="emailAddress"
      />
      <SubmitButton text={'Submit'} onPress={submit} loading={loading} />
      <TouchableText
        text={'Back to sign up'}
        onPress={() => navigate('signUp')}
        style={{ marginTop: 30 }}
      />
    </View>
  );
};

export default ForgotPassword;
