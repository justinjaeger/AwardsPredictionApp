import React from 'react';
import { TouchableHighlight, View, StyleProp, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import useDevice from '../../util/device';
import { getImageUri } from '../../util/getImageUri';
import { Spinner } from '@ui-kitten/components';
import COLORS from '../../constants/colors';

export const IPAD_PROFILE_IMAGE_SCALE = 1.5;

const ProfileImage = ({
  image,
  imageSize,
  style,
  onPress,
  isDisabled,
  isLoading,
}: {
  image?: string;
  imageSize?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
}) => {
  const { isPad } = useDevice();
  const uri = image ? getImageUri(image) : undefined;

  const size = (imageSize || 100) * (isPad ? IPAD_PROFILE_IMAGE_SCALE : 1);

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
