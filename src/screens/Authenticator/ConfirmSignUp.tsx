import React, { useEffect, useState } from 'react';
import { Text } from '@ui-kitten/components';
import { ScrollView } from 'react-native';
import { iAuthScreenProps, iAuthState } from './types';
import FormInput from '../../components/Inputs/FormInput';
import { SubmitButton } from '../../components/Buttons/SubmitButton';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';
import { useAuthenticator } from './context';

const ConfirmSignUp = (p: any) => {
  const props = p as iAuthScreenProps; // typecasting because props are automatically passed from Authenticator
  const { email } = useAuthenticator();

  const [code, setCode] = useState<string>('');

  useEffect(() => {
    // somehow get the code from url slug or something?
    // also, maybe get the email from the previous page?
  }, []);

  const navigate = (authState: iAuthState) => {
    props.onStateChange(authState, {});
  };

  const submit = () => {
    if (!email) {
      return Snackbar.error('Oops, something went wrong.');
    }
    AuthServices.confirmSignUp(email, code).then((res) => {
      if (res.status === 'success') {
        // Snackbar.success(`Confirmed! ${email}`);
        // redirect to signin or just sign in
        navigate('signIn');
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
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, width: '75%' }}
    >
      <Text>Confirm your email</Text>
      <FormInput label="Code" value={code} setValue={setCode} />
      <SubmitButton text={'Back to sign in'} onPress={() => navigate('signIn')} />
      <SubmitButton text={'Resend Code'} onPress={resendVerificationCode} />
      <SubmitButton text={'Submit'} onPress={submit} />
    </ScrollView>
  );
};

export default ConfirmSignUp;
