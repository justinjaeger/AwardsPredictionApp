import React, { useState } from 'react';
import { View } from 'react-native';
import { iAuthScreenProps, iAuthState } from './types';
import FormInput from '../../components/Inputs/FormInput';
import PasswordInput from '../../components/Inputs/PasswordInput';
import { SubmitButton, TouchableText } from '../../components/Buttons';
import AuthServices from '../../services/auth';
import { useAuthenticator } from './context';
import { EvaStatus } from '@ui-kitten/components/devsupport';
import { Body } from '../../components/Text';
import { SignupRow } from './styles';
import Snackbar from '../../components/Snackbar';
import COLORS from '../../constants/colors';

const SignUp = (p: any) => {
  const props = p as iAuthScreenProps; // typecasting because props are automatically passed from Authenticator
  const {
    email: contextEmail,
    setEmail: setContextEmail,
    password: contextPasword,
    setPassword: setContextPassword,
  } = useAuthenticator();

  const [email, setEmail] = useState<string>(contextEmail || '');
  const [password, setPassword] = useState<string>(contextPasword || '');
  const [emailStatus, setEmailStatus] = useState<EvaStatus | undefined>(undefined);
  const [passwordStatus, setPasswordStatus] = useState<EvaStatus | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const validPassword = password.length >= 8;
  const validEmail = email.length > 0 && email.includes('.') && email.includes('@');

  const navigate = (authState: iAuthState) => {
    console.error('navigate signup', authState);
    props.onStateChange(authState, {});
  };

  const signUp = () => {
    setLoading(true);
    AuthServices.signUp(email, password).then((res) => {
      if (res.status === 'success') {
        setContextPassword(password); // important: password should be filled out for this step
        Snackbar.success('We sent a verification code to your email', { duration: 4000 });
        navigate('confirmSignUp');
      }
      setLoading(false);
    });
  };

  return (
    <View style={{ width: '100%', backgroundColor: COLORS.primary }}>
      <FormInput
        label="Email"
        value={email}
        setValue={(v) => {
          setContextEmail(v);
          setEmail(v);
        }}
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
      <PasswordInput
        value={password}
        setValue={(v) => {
          setPassword(v);
          setContextPassword(v);
        }}
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
      <SubmitButton
        text={'Sign Up'}
        onPress={signUp}
        disabled={!validPassword || !validEmail}
        loading={loading}
        style={{ marginTop: 30 }}
      />
      <SignupRow style={{ marginTop: 30 }}>
        <Body style={{ marginRight: 5 }}>Already have an account?</Body>
        <TouchableText text={'Sign in'} onPress={() => navigate('signIn')} />
      </SignupRow>
      <SignupRow>
        <TouchableText
          text={'Enter confirmation code'}
          onPress={() => navigate('confirmSignUp')}
          style={{ marginTop: 30 }}
        />
      </SignupRow>
    </View>
  );
};

export default SignUp;
