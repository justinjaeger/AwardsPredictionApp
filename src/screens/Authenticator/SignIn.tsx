import React, { useState } from 'react';
import { View } from 'react-native';
import { iAuthScreenProps, iAuthState } from './types';
import PasswordInput from '../../components/Inputs/PasswordInput';
import FormInput from '../../components/Inputs/FormInput';
import { SubmitButton, TouchableText } from '../../components/Buttons';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';
import { useAuthenticator } from './context';
import { loginUser } from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SignupRow } from './styles';
import { Body } from '../../components/Text';
import { useAuth } from '../../store';
import { DataStore } from 'aws-amplify';
import { User } from '../../models';

const SignIn = (p: any) => {
  const props = p as iAuthScreenProps; // typecasting because props are automatically passed from Authenticator
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const { userEmail } = useAuth();
  const { email: contextEmail, setEmail: setContextEmail } = useAuthenticator();

  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>(userEmail || contextEmail || '');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = (authState: iAuthState) => {
    props.onStateChange(authState, {});
  };

  const signIn = () => {
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
          const users = await DataStore.query(User, (u) => u.email('eq', email));
          if (users.length > 0) {
            const user = users[0];
            dispatch(loginUser({ userId: user.id, userEmail: user.email }));
            goBack();
          }
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
    <View style={{ width: '100%' }}>
      <FormInput
        label="Email"
        value={email}
        setValue={setEmail}
        textContentType="emailAddress"
      />
      <PasswordInput value={password} setValue={setPassword} />
      <SubmitButton
        text={'Log in'}
        onPress={signIn}
        disabled={password.length < 8}
        loading={loading}
      />
      <SignupRow style={{ marginTop: 30 }}>
        <Body>Don't have an account?</Body>
        <TouchableText text={'Sign up'} onPress={() => navigate('signUp')} />
      </SignupRow>
      <TouchableText
        text={'Forgot my password'}
        onPress={() => navigate('forgotPassword')}
        style={{ marginTop: 10 }}
      />
      {email ? (
        <TouchableText
          text={'Resend confirmation code'}
          onPress={resendVerificationCode}
          style={{ marginTop: 10 }}
        />
      ) : null}
    </View>
  );
};

export default SignIn;
