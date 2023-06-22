import React from 'react';
import AuthServices from '../../../services/auth';
import GoogleIcon from '../../../assets/google.svg';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import COLORS from '../../../constants/colors';
import { SubHeaderLight } from '../../../components/Text';

const GoogleOauthButton = () => {
  const { width } = useWindowDimensions();

  return (
    <>
      <TouchableOpacity
        style={{
          height: 60,
          alignSelf: 'center',
          width: Math.min(400, width * 0.8),
          backgroundColor: COLORS.white,
          borderRadius: 200,
          position: 'relative',
        }}
        onPress={() => {
          // TODO: Replace with not Amplify (this is the last thing that uses Amplify)
          AuthServices.googleSignIn();
        }}
        activeOpacity={0.9}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: '100%',
            marginTop: -1,
            width: '100%',
          }}
        >
          <View style={{ width: '30%', alignItems: 'center' }}>
            <GoogleIcon width={30} height={60} />
          </View>
          <SubHeaderLight
            style={{
              width: '70%',
              color: COLORS.primary,
            }}
          >
            Sign in with Google
          </SubHeaderLight>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default GoogleOauthButton;
