import React from 'react';
import { StyleProp, TextStyle, Image, View, useWindowDimensions } from 'react-native';
import LoadingStatue from '../../../components/LoadingStatue';
import { Body, BodyBold } from '../../../components/Text';
import COLORS from '../../../constants/colors';
import GoogleOauthButton from './GoogleOauthButton';
import useGoogleSignIn from './useGoogleSignIn';
// @ts-ignore - it exists
import AppIcon from '../../../assets/branding/icon.jpg';
import AppleOauthButton from './AppleOauthButton';
import EmailButton from './EmailButton';

const OauthPage = () => {
  const { isLoading, isError } = useGoogleSignIn();
  const { width } = useWindowDimensions();

  const errorTextStyles: StyleProp<TextStyle> = {
    color: COLORS.white,
    textAlign: 'center',
    width: '80%',
    marginTop: 10,
    lineHeight: 20,
  };

  const appIconDimensions = Math.min(150, width * 0.3);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.primary,
        paddingTop: 30,
      }}
    >
      {isLoading ? (
        <View style={{ width: '100%', alignItems: 'center' }}>
          <LoadingStatue />
          <BodyBold style={{ textAlign: 'center' }}>Signing in...</BodyBold>
        </View>
      ) : (
        <>
          <Image
            source={AppIcon}
            style={{
              width: appIconDimensions,
              height: appIconDimensions,
              borderRadius: 10,
              alignSelf: 'center',
              marginBottom: 30,
              borderWidth: 1,
              borderColor: COLORS.white,
            }}
          />
          <GoogleOauthButton />
          <AppleOauthButton />
          <EmailButton />
          {isError ? (
            <View style={{ width: '100%', alignItems: 'center', marginTop: 40 }}>
              <Body style={errorTextStyles}>{'Sorry, an error has occured.'}</Body>
              <Body style={errorTextStyles}>
                {'Notify our developer by going back and messaging in the "?" tab.'}
              </Body>
            </View>
          ) : null}
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
        </>
      )}
    </View>
  );
};

export default OauthPage;
