import React from 'react';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import COLORS from '../../../constants/colors';
import { SubHeaderLight } from '../../../components/Text';
import CustomIcon from '../../../components/CustomIcon';
import { useNavigation } from '@react-navigation/native';
import { AuthTabNavigationProp } from '../../../navigation/types';

const AppleOauthButton = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<AuthTabNavigationProp>();

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
          navigation.navigate('Email');
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
            <CustomIcon
              name={'email-outline'}
              color={COLORS.primary}
              styles={{ borderRadius: 100 }}
            />
          </View>
          <SubHeaderLight
            style={{
              width: '70%',
              color: COLORS.primary,
            }}
          >
            Sign in with Email
          </SubHeaderLight>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default AppleOauthButton;
