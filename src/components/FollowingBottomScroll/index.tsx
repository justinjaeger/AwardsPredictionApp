import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, View } from 'react-native';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { useCategory } from '../../context/CategoryContext';
import { useFollowingBar } from '../../context/FollowingBarContext';
import useFriendsPredictingEvent from '../../hooks/useFriendsPredictingEvent';
import useDevice from '../../util/device';
import { IconButton } from '../Buttons/IconButton';
import ProfileImage, { IPAD_PROFILE_IMAGE_SCALE } from '../ProfileImage';

const IMAGE_WIDTH = 50;
const IMAGE_MARGIN = 5;

const FollowingBottomScroll = ({
  userId,
  onPress,
}: {
  userId: string;
  onPress: (userId: string) => void;
}) => {
  const friendsYPos = useRef(new Animated.Value(0)).current;
  const { event } = useCategory();
  const { isHidden, setIsHidden } = useFollowingBar();
  const { data: users } = useFriendsPredictingEvent(userId, event?.id);
  const { isPad } = useDevice();

  useEffect(() => {
    Animated.timing(friendsYPos, {
      toValue: isHidden ? 100 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isHidden]);

  if (!users || users.length === 0) return null;

  return (
    <>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: 10,
        }}
      >
        <IconButton
          iconProps={{
            name: isHidden ? 'people-outline' : 'chevron-down-outline',
          }}
          color={COLORS.white}
          styles={{
            backgroundColor: COLORS.secondaryDark,
            marginLeft: theme.windowMargin,
            padding: 3,
          }}
          onPress={() => setIsHidden(!isHidden)}
        />
      </View>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          alignItems: 'center',
          flexDirection: 'row',
          marginLeft: 80,
          transform: [{ translateY: friendsYPos }],
        }}
      >
        <ScrollView
          horizontal
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {users.map((user) => (
            <ProfileImage
              key={user.id}
              image={user.image}
              imageSize={IMAGE_WIDTH}
              onPress={() => onPress(user.id)}
              style={{
                width: (IMAGE_WIDTH + 3) * (isPad ? IPAD_PROFILE_IMAGE_SCALE : 1), // this only makes sense because the profile image is equally scaled
                margin: IMAGE_MARGIN,
                borderWidth: 4,
                borderColor: COLORS.secondary,
                borderRadius: 100,
                shadowRadius: 20,
                shadowColor: 'black',
                shadowOpacity: 1,
                shadowOffset: { height: 10, width: 0 },
              }}
            />
          ))}
        </ScrollView>
      </Animated.View>
    </>
  );
};

export default FollowingBottomScroll;
