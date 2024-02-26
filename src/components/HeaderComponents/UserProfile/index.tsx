import React from 'react';
import { View } from 'react-native';
import ProfileImage from '../../ProfileImage';

export const USER_PROFILE_HEIGHT = 60;

const UserProfile = ({ image }: { image?: string }) => {
  return (
    <View
      style={{
        height: USER_PROFILE_HEIGHT,
        alignItems: 'center',
      }}
    >
      <ProfileImage image={image} imageSize={USER_PROFILE_HEIGHT} onPress={() => {}} />
    </View>
  );
};

export default UserProfile;
