import React from 'react';
import { View } from 'react-native';
import { Body } from '../../../components/Text';
import COLORS from '../../../constants/colors';
import GoogleOauthButton from './Buttons/GoogleOauthButton';
import AppleOauthButton from './Buttons/AppleOauthButton';
import EmailButton from './Buttons/EmailButton';
import useGoogleOAuth from './useGoogleOauth';
import useAppleOauth from './useAppleOauth';
import { useAuth } from '../../../context/AuthContext';
import LoadingStatueModal from '../../../components/LoadingStatueModal';

const OauthPage = () => {
  const { isLoadingAuth } = useAuth();
  const { googleSignIn, isLoading: isLoadingGoogleAuth } = useGoogleOAuth();
  const { appleSignIn, isLoading: isLoadingAppleAuth } = useAppleOauth();

  const isLoading = isLoadingAuth || isLoadingGoogleAuth || isLoadingAppleAuth;

  return (
    <>
      <LoadingStatueModal
        visible={isLoading}
        text={isLoadingAuth ? 'Signing in...' : 'Authenticating...'}
      />
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: COLORS.primary,
          paddingTop: 30,
        }}
      >
        <GoogleOauthButton onPress={googleSignIn} />
        <AppleOauthButton onPress={appleSignIn} />
        <EmailButton />
        <Body
          style={{
            textAlign: 'center',
            marginTop: 30,
            lineHeight: 20,
            width: '90%',
            alignSelf: 'center',
          }}
        >
          {'Your info will never be used for\nthird party services.'}
        </Body>
      </View>
    </>
  );
};

export default OauthPage;
