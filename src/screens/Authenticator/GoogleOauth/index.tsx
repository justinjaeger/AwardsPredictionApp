import React from 'react';
import { StyleProp, TextStyle, View } from 'react-native';
import LoadingStatue from '../../../components/LoadingStatue';
import { Body } from '../../../components/Text';
import COLORS from '../../../constants/colors';
import GoogleOauthButton from './GoogleOauthButton';
import useGoogleSignIn from './useGoogleSignIn';

const GoogleOauthPage = () => {
  const { isLoading, isError } = useGoogleSignIn();

  const errorTextStyles: StyleProp<TextStyle> = {
    color: COLORS.white,
    textAlign: 'center',
    width: '80%',
    marginTop: 10,
    lineHeight: 20,
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.primary,
        paddingTop: 40,
      }}
    >
      {isLoading ? (
        <View style={{ width: '100%', alignItems: 'center' }}>
          <LoadingStatue />
          <Body style={{ textAlign: 'center' }}>Signing in...</Body>
        </View>
      ) : (
        <>
          <GoogleOauthButton />
          <View style={{ width: '100%', alignItems: 'center', marginTop: 40 }}>
            {isError ? (
              <>
                <Body style={errorTextStyles}>{'Sorry, an error has occured.'}</Body>
                <Body style={errorTextStyles}>
                  {'Notify our developer by going back and messaging in the "?" tab.'}
                </Body>
              </>
            ) : null}
          </View>
        </>
      )}
    </View>
  );
};

export default GoogleOauthPage;
