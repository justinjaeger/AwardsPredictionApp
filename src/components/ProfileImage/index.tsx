import React from 'react';
import { TouchableHighlight, View, StyleProp, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import useDevice from '../../util/device';
import { getImageUri } from '../../util/getImageUri';
import { Spinner } from '@ui-kitten/components';
import COLORS from '../../constants/colors';
import { User } from '../../types/api';

export const IPAD_PROFILE_IMAGE_SCALE = 1.5;
export enum ProfileImageSize {
  SM = 50,
  MD = 200,
  LG = 600,
}

const ProfileImage = ({
  user,
  imageSize,
  style,
  onPress,
  isDisabled,
  isLoading,
}: {
  user?: User | null;
  imageSize?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
}) => {
  const { isPad } = useDevice();
  const size = (imageSize || 100) * (isPad ? IPAD_PROFILE_IMAGE_SCALE : 1);

  const profileImageSize: ProfileImageSize =
    size <= ProfileImageSize.SM
      ? ProfileImageSize.SM
      : size <= ProfileImageSize.MD
      ? ProfileImageSize.MD
      : ProfileImageSize.LG;

  const image =
    (profileImageSize === ProfileImageSize.SM
      ? user?.imageSm
      : profileImageSize === ProfileImageSize.MD
      ? user?.imageMd
      : user?.imageLg) ?? user?.image;

  const uri = image ? getImageUri(image) : undefined;

  return (
    <View
      style={[
        {
          width: size,
          alignItems: 'center',
        },
        style,
      ]}
    >
      <TouchableHighlight
        onPress={() => {
          if (onPress && !isDisabled && !isLoading) {
            onPress();
          }
        }}
        style={{
          height: size,
          width: size,
          borderRadius: size,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        disabled={isDisabled}
      >
        {isLoading ? (
          <Spinner size="medium" style={{ borderColor: COLORS.gray }} />
        ) : (
          <FastImage
            source={uri ? { uri } : require('../../assets/PROFILE.png')}
            style={{ width: size, height: size, borderRadius: size }}
          />
        )}
      </TouchableHighlight>
    </View>
  );
};

export default ProfileImage;
