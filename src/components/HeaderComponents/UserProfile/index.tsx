import React from 'react';
import ProfileImage from '../../ProfileImage';
import { StackActions, useNavigation } from '@react-navigation/native';
import { PredictionsNavigationProp, iUserInfo } from '../../../navigation/types';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import COLORS from '../../../constants/colors';
import { SubHeader } from '../../Text';
import CustomIcon from '../../CustomIcon';
import { HEADER_TITLE_MARGIN_TOP } from '../constants';
import { HEADER_HEIGHT } from '../Header';
import useDevice from '../../../util/device';

export const USER_PROFILE_HEIGHT = 60;

const UserProfile = ({
  userInfo,
  disableImageOverlap,
  style,
}: {
  userInfo: iUserInfo;
  disableImageOverlap?: boolean;
  style?: StyleProp<ViewStyle>;
}) => {
  const { isSmallScreen } = useDevice();
  const navigation = useNavigation<PredictionsNavigationProp>();

  const navigateToProfile = () => {
    // important to push so we can have multiple profiles in same stack
    navigation.dispatch(StackActions.push('Profile', { userInfo }));
  };

  return userInfo.userImage ? (
    <View style={[{ height: USER_PROFILE_HEIGHT }, style]}>
      <ProfileImage
        image={userInfo.userImage}
        imageSize={
          USER_PROFILE_HEIGHT +
          (disableImageOverlap || isSmallScreen
            ? 0
            : HEADER_HEIGHT + HEADER_TITLE_MARGIN_TOP - 10)
        }
        onPress={navigateToProfile}
        disablePadResize
      />
    </View>
  ) : (
    <TouchableOpacity
      onPress={navigateToProfile}
      style={[
        {
          height: USER_PROFILE_HEIGHT,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
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
