import React, { useState } from 'react';
import { View } from 'react-native';
import { iAuthScreenProps, iAuthState } from './types';
import PasswordInput from '../../components/Inputs/PasswordInput';
import FormInput from '../../components/Inputs/FormInput';
import { SubmitButton, TouchableText } from '../../components/Buttons';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';
import { useAuthenticator } from './context';
import { useNavigation } from '@react-navigation/native';
import { SignupRow } from './styles';
import { Body } from '../../components/Text';
import ApiServices from '../../services/graphql';
import { useAuth } from '../../context/UserContext';
import COLORS from '../../constants/colors';

const SignIn = (p: any) => {
  const props = p as iAuthScreenProps; // typecasting because props are automatically passed from Authenticator
  const { goBack } = useNavigation();
  const { userEmail } = useAuth();
  const {
    email: contextEmail,
    setEmail: setContextEmail,
    password: contextPasword,
    setPassword: setContextPassword,
  } = useAuthenticator();
  const { signInUser } = useAuth();

  const [email, setEmail] = useState<string>(userEmail || contextEmail || '');
  const [password, setPassword] = useState<string>(contextPasword || '');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = (authState: iAuthState) => {
    props.onStateChange(authState, {});
  };

  const signIn = async () => {
    setLoading(true);
    setContextEmail(email);
    AuthServices.signIn(email, password).then(async (res) => {
      if (res.status === 'success') {
        if (res.message) {
          // display message that verification code has been sent to email
          // navigate to verification code / signup
          navigate('confirmSignUp');
          Snackbar.success(res.message, {
            duration: 5000,
          });
        } else {
          const { data: user } = await ApiServices.getUserByEmail(email);
          const u = user?.listUsers?.items[0];
          if (!u) return;
          signInUser(u.id, u.email, u.role);
          goBack();
        }
      }
      setLoading(false);
    });
  };

  const resendVerificationCode = () => {
    if (!email) {
      return Snackbar.error('Oops, something went wrong.');
    }
    AuthServices.resendSignUp(email).then(() => {
      navigate('confirmSignUp');
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
      />
      <PasswordInput
        value={password}
        setValue={(v) => {
          setPassword(v);
          setContextPassword(v);
        }}
      />
      <SubmitButton
        text={'Log in'}
        onPress={signIn}
        disabled={password.length < 8}
        loading={loading}
        style={{ marginTop: 30 }}
      />
      <SignupRow style={{ marginTop: 30 }}>
        <Body style={{ marginRight: 5 }}>Don't have an account?</Body>
        <TouchableText text={'Sign up'} onPress={() => navigate('signUp')} />
      </SignupRow>
      <TouchableText
        text={'Forgot my password'}
        onPress={() => navigate('forgotPassword')}
        style={{ marginTop: 30 }}
      />
      {email ? (
        <TouchableText
          text={'Resend confirmation code'}
          onPress={resendVerificationCode}
          style={{ marginTop: 30 }}
        />
      ) : null}
    </View>
  );
};

export default SignIn;
