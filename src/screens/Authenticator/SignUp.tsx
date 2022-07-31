import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { iAuthScreenProps, iAuthState } from './types';
import FormInput from '../../components/Inputs/FormInput';
import PasswordInput from '../../components/Inputs/PasswordInput';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';
import { useAuthenticator } from './context';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/actions/auth';
import { useNavigation } from '@react-navigation/native';

const SignUp = (p: any) => {
  const props = p as iAuthScreenProps; // typecasting because props are automatically passed from Authenticator
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const { email: contextEmail, setEmail: setContextEmail } = useAuthenticator();

  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>(contextEmail || '');

  const navigate = (authState: iAuthState) => {
    props.onStateChange(authState, {});
  };

  const signUp = () => {
    setContextEmail(email);
    AuthServices.signUp(email, password).then((res) => {
      if (res.status === 'success') {
        // can do something with res.data
        // can delete snackbar success
        // TODO: create user in db
        dispatch(
          loginUser({
            id: '1234', // TODO: fix
            email,
          }),
        );
        Snackbar.success('Signup successful');
        goBack();
      }
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
      <PasswordInput
        value={password}
        setValue={setPassword}
        caption={'Should contain at least 8 characters'}
      />
      <SubmitButton text={'Go to sign in'} onPress={() => navigate('signIn')} />
      <SubmitButton
        text={'Enter confirmation code'}
        onPress={() => navigate('confirmSignUp')}
      />
      <SubmitButton text={'Sign Up'} onPress={signUp} disabled={password.length < 8} />
    </ScrollView>
  );
};

export default SignUp;
