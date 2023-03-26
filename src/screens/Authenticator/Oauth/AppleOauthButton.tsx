import React from 'react';
import AuthServices from '../../../services/auth';
import AppleIcon from '../../../assets/apple.svg';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import COLORS from '../../../constants/colors';
import { SubHeaderLight } from '../../../components/Text';

const AppleOauthButton = () => {
  const { width } = useWindowDimensions();

  return (
    <>
      <TouchableOpacity
        style={{
          marginTop: 20,
          height: 60,
          alignSelf: 'center',
          width: Math.min(400, width * 0.8),
          backgroundColor: COLORS.white,
          borderRadius: 200,
          position: 'relative',
        }}
        onPress={() => {
          AuthServices.appleSignIn();
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
            <AppleIcon width={55} height={55} />
          </View>
          <SubHeaderLight
            style={{
              width: '70%',
              color: COLORS.primary,
            }}
          >
            Sign in with Apple
          </SubHeaderLight>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default AppleOauthButton;
