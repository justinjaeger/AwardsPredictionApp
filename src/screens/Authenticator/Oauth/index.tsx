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
import useDevice from '../../../util/device';

const OauthPage = () => {
  const { isLoadingSignIn } = useAuth();
  const { isAndroid } = useDevice();
  const { googleSignIn, isLoading: isLoadingGoogleAuth } = useGoogleOAuth();
  const { appleSignIn, isLoading: isLoadingAppleAuth } = useAppleOauth();

  const isLoading = isLoadingSignIn || isLoadingGoogleAuth || isLoadingAppleAuth;

  return (
    <>
      <LoadingStatueModal
        visible={isLoading}
        text={isLoadingSignIn ? 'Signing in...' : 'Authenticating...'}
      />
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: COLORS.primary,
          paddingTop: 30,
        }}
      >
        {!isAndroid ? <GoogleOauthButton onPress={googleSignIn} /> : null}
        {!isAndroid ? <AppleOauthButton onPress={appleSignIn} /> : null}
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
