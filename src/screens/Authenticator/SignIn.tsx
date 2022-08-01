import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { iAuthScreenProps, iAuthState } from './types';
import PasswordInput from '../../components/Inputs/PasswordInput';
import FormInput from '../../components/Inputs/FormInput';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';
import { useAuthenticator } from './context';
import { loginUser } from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const SignIn = (p: any) => {
  const props = p as iAuthScreenProps; // typecasting because props are automatically passed from Authenticator
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const { email: contextEmail, setEmail: setContextEmail } = useAuthenticator();

  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>(contextEmail || '');

  const navigate = (authState: iAuthState) => {
    props.onStateChange(authState, {});
  };

  const signIn = () => {
    setContextEmail(email);
    AuthServices.signIn(email, password).then((res) => {
      if (res.status === 'success') {
        if (res.message) {
          // display message that verification code has been sent to email
          // navigate to verification code / signup
          navigate('confirmSignUp');
          return Snackbar.success(res.message, {
            duration: 5000,
          });
        }
        // TODO: get existing user from database
        // const existingUser = getExistingUser({ email: '', username: ''});
        dispatch(
          loginUser({
            id: '1234', // TODO: fix
            email,
          }),
        );
        goBack();
      }
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
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, width: '75%' }}
    >
      <FormInput
        label="Email"
        value={email}
        setValue={setEmail}
        textContentType="emailAddress"
      />
      <PasswordInput value={password} setValue={setPassword} />
      <SubmitButton text={'Go to sign up'} onPress={() => navigate('signUp')} />
      <SubmitButton
        text={'Forgot your password?'}
        onPress={() => navigate('forgotPassword')}
      />
      <SubmitButton text={'Resend confirmation code?'} onPress={resendVerificationCode} />
      <SubmitButton text={'Log in'} onPress={signIn} disabled={password.length < 8} />
    </ScrollView>
  );
};

export default SignIn;
