import React from 'react';
import { TouchableHighlight, View, StyleProp, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import useProfileImage from '../../hooks/useProfileImage';
import useDevice from '../../util/device';

const ProfileImage = ({
  image,
  imageSize,
  style,
  onPress,
  isDisabled,
}: {
  image?: string;
  imageSize?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  isDisabled?: boolean;
}) => {
  const { isPad } = useDevice();
  const { uri } = useProfileImage(image);

  const size = (imageSize || 100) * (isPad ? 1.5 : 1);

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
        onPress={onPress}
        style={{
          height: size,
          width: size,
          borderRadius: size,
        }}
        disabled={isDisabled}
      >
        <FastImage
          source={uri ? { uri } : require('../../assets/PROFILE.png')}
          style={{ width: size, height: size, borderRadius: size }}
        />
      </TouchableHighlight>
    </View>
  );
};

export default ProfileImage;
