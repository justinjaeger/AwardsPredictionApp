import React from 'react';
import { TouchableHighlight, View, Image, StyleProp, ViewStyle } from 'react-native';
import useProfileImage from '../../hooks/useProfileImage';

const ProfileImage = ({
  image,
  imageSize,
  containerStyle,
  onPress,
}: {
  image?: string;
  imageSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}) => {
  const { uri } = useProfileImage(image);

  const size = imageSize || 100;

  return (
    <View
      style={[
        {
          width: size * 1.3,
          alignItems: 'center',
        },
        containerStyle,
      ]}
    >
      <TouchableHighlight
        onPress={onPress}
        style={{
          height: size,
          width: size,
          borderRadius: size,
        }}
      >
        <Image
          source={uri ? { uri } : require('../../assets/PROFILE.png')}
          width={size}
          height={size}
          style={{ width: size, height: size, borderRadius: size }}
        />
      </TouchableHighlight>
    </View>
  );
};

export default ProfileImage;
