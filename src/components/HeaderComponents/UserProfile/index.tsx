import React from 'react';
import ProfileImage from '../../ProfileImage';
import { StackActions, useNavigation } from '@react-navigation/native';
import { PredictionsNavigationProp, iUserInfo } from '../../../navigation/types';
import { TouchableOpacity, View } from 'react-native';
import COLORS from '../../../constants/colors';
import { SubHeader } from '../../Text';
import CustomIcon from '../../CustomIcon';

export const USER_PROFILE_HEIGHT = 60;

const UserProfile = ({ userInfo }: { userInfo: iUserInfo }) => {
  const navigation = useNavigation<PredictionsNavigationProp>();

  const navigateToProfile = () => {
    // important to push so we can have multiple profiles in same stack
    navigation.dispatch(StackActions.push('Profile', { userInfo }));
  };

  return userInfo.userImage ? (
    <ProfileImage
      image={userInfo.userImage}
      imageSize={USER_PROFILE_HEIGHT}
      onPress={navigateToProfile}
    />
  ) : (
    <TouchableOpacity
      onPress={navigateToProfile}
      style={{
        height: USER_PROFILE_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.primaryLight,
          padding: 5,
          paddingLeft: 15,
          paddingRight: 15,
          borderRadius: USER_PROFILE_HEIGHT,
          flexDirection: 'row',
        }}
      >
        <SubHeader>{userInfo.userName ?? ''}</SubHeader>
        <CustomIcon name="chevron-right-outline" size={20} color={COLORS.white} />
      </View>
    </TouchableOpacity>
  );
};

export default UserProfile;
