import React, { useState } from 'react';
import { AuthProvider } from './context';
import { Keyboard, ScrollView, View } from 'react-native';
import FormInput from '../../components/Inputs/FormInput';
import { SubmitButton } from '../../components/Buttons';
import Snackbar from '../../components/Snackbar';
import { HeaderLight } from '../../components/Text';
import COLORS from '../../constants/colors';
import useDeepLink from '../../hooks/useDeepLink';
import { useAuth } from '../../context/UserContext';
import LoadingStatueModal from '../../components/LoadingStatueModal';
import MongoApi from '../../services/api/requests';

type iAuthScreen = 'signIn' | 'confirmCode';

const Auth = () => {
  const { signInUser, isLoadingAuth, isNewUser } = useAuth();

  const [email, setEmail] = useState<string>('');
  const validEmail = email.length > 0 && email.includes('.') && email.includes('@');
  const [loading, setLoading] = useState<boolean>(false);
  const [authScreen, setAuthScreen] = useState<iAuthScreen>('signIn');

  // when verification link is clicked, this callback fires
  const handleSignIn = async (url: string) => {
    const { data: email } = await MongoApi.verifyEmailMagicLink(url); // handles snackbar error messages already
    if (!email) {
      console.error('error: confirmation code not confirmed');
      setAuthScreen('signIn');
      return;
    }
    const { data: user } = await MongoApi.getUser({ email });
    if (!user) {
      console.error('something went wrong getting user by email during sign in');
      return;
    }
    signInUser({ userId: user._id, email: user.email, role: user.role });
  };

  // listen for verification link
  // looks like oscar://signin/?token={jwt}&email={email")
  useDeepLink((u: string) => handleSignIn(u));

  const submitEmail = async () => {
    setLoading(true);
    const getUserRes = await MongoApi.getUser({ email });
    let user = getUserRes.data;
    // if no user exists, create one
    if (!user) {
      const createUserRes = await MongoApi.createUser({ email });
      user = createUserRes.data;
    }
    if (!user) {
      Snackbar.error('error signing in with email');
    } else {
      // whether user is new or not, send email to log in
      setAuthScreen('confirmCode');
      await MongoApi.sendVerificationEmail(email);
    }
    setLoading(false);
  };

  return (
    <AuthProvider>
      <LoadingStatueModal visible={isLoadingAuth} />
      <ScrollView
        style={{ width: '100%', backgroundColor: COLORS.primary }}
        contentContainerStyle={{
          alignItems: 'center',
          width: '100%',
          marginTop: 20,
        }}
        keyboardShouldPersistTaps={'always'}
        onScroll={() => Keyboard.dismiss()}
      >
        {authScreen === 'signIn' ? (
          <View style={{ width: '80%', backgroundColor: COLORS.primary }}>
            <FormInput
              label="Email"
              value={email}
              setValue={(v) => {
                setEmail(v);
              }}
              textContentType="emailAddress"
            />
            <SubmitButton
              text={isNewUser ? 'Create account' : 'Sign in'}
              onPress={() => submitEmail()}
              disabled={!validEmail}
              loading={loading}
              style={{ marginTop: 20 }}
            />
          </View>
        ) : (
          <View style={{ width: '100%', backgroundColor: COLORS.primary }}>
            <HeaderLight
              style={{ textAlign: 'center', fontWeight: '500' }}
            >{`We sent a link to ${email}`}</HeaderLight>
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
