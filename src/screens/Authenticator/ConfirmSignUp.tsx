import React, { useState } from 'react';
import { View } from 'react-native';
import { iAuthScreenProps, iAuthState } from './types';
import FormInput from '../../components/Inputs/FormInput';
import { SubmitButton, TouchableText } from '../../components/Buttons';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';
import { useAuthenticator } from './context';
import { User, UserRole } from '../../API';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/actions/auth';
import ApiServices from '../../services/graphql/mutations';

const ConfirmSignUp = (p: any) => {
  const props = p as iAuthScreenProps; // typecasting because props are automatically passed from Authenticator
  const {
    email: contextEmail,
    setEmail: setContextEmail,
    password: contextPassword,
    username: contextUsername,
  } = useAuthenticator();
  const dispatch = useDispatch();

  const [code, setCode] = useState<string>('');
  const [email, setEmail] = useState<string>(contextEmail || '');
  const [username, setUsername] = useState<string>(contextUsername || '');

  const validCode = code.length === 6;
  const validEmail = email.length > 0 && email.includes('.') && email.includes('@');

  const navigate = (authState: iAuthState) => {
    props.onStateChange(authState, {});
  };

  const submit = () => {
    if (!email) {
      return Snackbar.error('Oops, something went wrong.');
    }
    AuthServices.confirmSignUp(email, code).then(async (res) => {
      setContextEmail(email);
      if (res.status === 'success') {
        // if password somehow isn't stored, generate random one. they can reset password later
        const password = contextPassword || (Math.random() * 1000000000).toString();
        // Create new user in db
        ApiServices.createUser({
          email,
          username,
          admin: UserRole.USER,
        })
          .then((res) => {
            console.error('res.data', res.data?.createUser);
            const user = res.data?.createUser;
            if (!user) throw new Error();
            // Sign user in
            AuthServices.signIn(email, password).then((res) => {
              if (res.status === 'success') {
                // tell Redux user is logged in
                dispatch(loginUser(user as User)); // definitely is this type if you mouse over "const user"
              }
            });
          })
          .catch((err) => {
            console.error('err', err);
            // this case would be pretty bad
            Snackbar.error('Sorry, something went wrong.');
          });
      }
    });
  };

  const resendVerificationCode = () => {
    if (!email) {
      return Snackbar.error('Oops, something went wrong.');
    }
    AuthServices.resendSignUp(email);
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
      {!contextUsername ? (
        <FormInput
          label="Username"
          value={username}
          setValue={setUsername}
          textContentType="username"
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
