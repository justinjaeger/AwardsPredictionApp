import React, { useState } from 'react';
import { View } from 'react-native';
import { iAuthScreenProps, iAuthState } from './types';
import FormInput from '../../components/Inputs/FormInput';
import { SubmitButton, TouchableText } from '../../components/Buttons';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';
import { useAuthenticator } from './context';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/actions/auth';
import { useNavigation } from '@react-navigation/native';
import ApiServices from '../../services/graphql';

const ConfirmSignUp = (p: any) => {
  const props = p as iAuthScreenProps; // typecasting because props are automatically passed from Authenticator
  const {
    email: contextEmail,
    setEmail: setContextEmail,
    password: contextPassword,
  } = useAuthenticator();
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  const [code, setCode] = useState<string>('');
  const [email, setEmail] = useState<string>(contextEmail || '');
  const [loading, setLoading] = useState<boolean>(false);

  const validCode = code.length === 6;
  const validEmail = email.length > 0 && email.includes('.') && email.includes('@');

  const navigate = (authState: iAuthState) => {
    props.onStateChange(authState, {});
  };

  const submit = () => {
    if (!email) {
      return Snackbar.error('Oops, something went wrong.');
    }
    setLoading(true);
    AuthServices.confirmSignUp(email, code).then(async (res) => {
      setContextEmail(email);
      if (res.status === 'success') {
        // if password somehow isn't stored, generate random one. they can reset password later
        const password = contextPassword || (Math.random() * 1000000000).toString();
        // Create new user in db
        const { data: user } = await ApiServices.createUser(email);
        const u = user?.createUser;
        if (!u) return; // maybe display status message
        AuthServices.signIn(email, password).then((res) => {
          if (res.status === 'success') {
            dispatch(loginUser({ userId: u.id, userEmail: u.email }));
            goBack();
          }
        });
      }
      setLoading(false);
    });
  };

  const resendVerificationCode = () => {
    if (!email) {
      return Snackbar.error('Oops, something went wrong.');
    }
    AuthServices.resendSignUp(email);
    Snackbar.success('A verification code was sent to your email');
  };

  return (
    <View style={{ width: '100%' }}>
      {!contextEmail ? (
        <FormInput
          label="Email"
          value={email}
          setValue={setEmail}
          textContentType="emailAddress"
        />
      ) : null}
      <FormInput
        label="Code"
        value={code}
        setValue={setCode}
        textContentType="oneTimeCode"
      />
      <SubmitButton
        text={'Submit'}
        onPress={submit}
        disabled={!validCode || !validEmail}
        loading={loading}
      />
      <TouchableText
        text={'Back to sign in'}
        onPress={() => navigate('signIn')}
        style={{ marginTop: 30 }}
      />
      {email ? (
        <TouchableText
          text={'Resend Code'}
          onPress={resendVerificationCode}
          style={{ marginTop: 20 }}
        />
      ) : null}
    </View>
  );
};

export default ConfirmSignUp;
