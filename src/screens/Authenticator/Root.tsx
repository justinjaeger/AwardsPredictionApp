import React, { useState } from 'react';
// @ts-ignore - doesn't have typescript package
import { AuthProvider } from './context';
import { Keyboard, ScrollView, View } from 'react-native';
import FormInput from '../../components/Inputs/FormInput';
import { SubmitButton } from '../../components/Buttons';
import Snackbar from '../../components/Snackbar';
import { Body } from '../../components/Text';
import ApiServices from '../../services/graphql';
import COLORS from '../../constants/colors';
import { UserRole } from '../../API';
import EmailService from '../../services/email';
import useDeepLink from '../../hooks/useDeepLink';
import { useAuth } from '../../context/UserContext';

type iAuthScreen = 'signIn' | 'confirmCode';

const Auth = () => {
  const { signInUser } = useAuth();

  const [email, setEmail] = useState<string>('');
  const validEmail = email.length > 0 && email.includes('.') && email.includes('@');
  const [loading, setLoading] = useState<boolean>(false);
  const [authScreen, setAuthScreen] = useState<iAuthScreen>('signIn');

  // when verification link is clicked, this callback fires
  const handleSignIn = async (url: string) => {
    const maybeEmail = await EmailService.confirmCode(url); // handles snackbar error messages already
    if (!maybeEmail) {
      console.error('error: confirmation code not confirmed');
      setAuthScreen('signIn');
      return;
    }
    const { data } = await ApiServices.getUserByEmail(maybeEmail);
    const user = data?.userByEmail?.items?.[0];
    if (!user) {
      console.error('something went wrong getting user by email during sign in');
      return;
    }
    signInUser(user.id, user.email, user.role);
  };
  useDeepLink((u: string) => handleSignIn(u)); // listens for verification link

  const submitEmail = async () => {
    setLoading(true);
    const { data } = await ApiServices.getUserByEmail(email);
    let user = data?.userByEmail?.items?.[0];
    // if no user exists, create one
    if (!user) {
      const { data: createUserData } = await ApiServices.createUser(email, UserRole.USER);
      user = createUserData?.createUser;
    }
    if (!user) {
      Snackbar.error('error signing in with email');
    } else {
      setAuthScreen('confirmCode');
      await EmailService.sendCode(email);
    }
    setLoading(false);
  };

  return (
    <AuthProvider>
      <ScrollView
        style={{ width: '100%', backgroundColor: COLORS.primary }}
        contentContainerStyle={{
          alignItems: 'center',
          width: '100%',
        }}
        keyboardShouldPersistTaps={'always'}
        onScroll={() => Keyboard.dismiss()}
      >
        {authScreen === 'signIn' ? (
          <View style={{ width: '100%', backgroundColor: COLORS.primary }}>
            <FormInput
              label="Email"
              value={email}
              setValue={(v) => {
                setEmail(v);
              }}
              textContentType="emailAddress"
            />
            <SubmitButton
              text={'Sign in'}
              onPress={() => submitEmail()}
              disabled={!validEmail}
              loading={loading}
              style={{ marginTop: 30 }}
            />
          </View>
        ) : (
          <View style={{ width: '100%', backgroundColor: COLORS.primary }}>
            <Body>{`We sent a code to ${email}`}</Body>
            <SubmitButton
              text={'Send again'}
              onPress={() => setAuthScreen('signIn')}
              style={{ marginTop: 30 }}
            />
          </View>
        )}
      </ScrollView>
    </AuthProvider>
  );
};

export default Auth;
