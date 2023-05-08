import React, { useState } from 'react';
import { View } from 'react-native';
import { iAuthScreenProps, iAuthState } from './types';
import FormInput from '../../components/Inputs/FormInput';
import AuthServices from '../../services/auth';
import Snackbar from '../../components/Snackbar';
import { useAuthenticator } from './context';
import { SubmitButton, TouchableText } from '../../components/Buttons';
import COLORS from '../../constants/colors';
import ApiServices from '../../services/graphql';
import { useAuth } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import PasswordInput from '../../components/Inputs/PasswordInput';

const RequireNewPassword = (p: any) => {
  const props = p as iAuthScreenProps; // typecasting because props are automatically passed from Authenticator
  const { email } = useAuthenticator();
  const { signInUser } = useAuth();
  const navigation = useNavigation();

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
    AuthServices.forgotPasswordSubmit(email, code, password).then(async (res) => {
      if (res.status === 'success') {
        // SIGN USER IN
        const { data: user } = await ApiServices.getUserByEmail(email);
        const u = user?.userByEmail?.items[0];
        if (!u) return;
        signInUser(u.id, u.email, u.role);
        navigation.navigate('BottomTabNavigator', {
          screen: 'Profile',
        });
        navigation.goBack();
      }
      setLoading(false);
    });
  };

  const requestCode = () => {
    if (!email) {
      return Snackbar.error('Something went wrong. Restart "forgot password" process');
    }
    setLoading(true);
    // setContextEmail(email);
    AuthServices.forgotPassword(email).then((res) => {
      if (res.status === 'success') {
        Snackbar.success(`Confirm the code we sent to ${email}`);
        navigate('requireNewPassword');
      }
      setLoading(false);
    });
  };

  return (
    <View style={{ width: '100%', backgroundColor: COLORS.primary }}>
      <FormInput
        label="Code"
        value={code}
        setValue={setCode}
        caption="Sent to your email"
        style={{ marginBottom: 10 }}
      />
      <PasswordInput label="New Password" value={password} setValue={setPassword} />
      <SubmitButton text={'Submit'} onPress={submit} loading={loading} />
      <TouchableText
        text={'Go to sign up'}
        onPress={() => navigate('signUp')}
        style={{ marginTop: 30 }}
      />
      <TouchableText
        text={'Resend code'}
        onPress={requestCode}
        style={{ marginTop: 30 }}
      />
    </View>
  );
};

export default RequireNewPassword;
