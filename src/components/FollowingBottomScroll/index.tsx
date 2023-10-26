import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, View } from 'react-native';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { useEvent } from '../../context/EventContext';
import { useFollowingBar } from '../../context/FollowingBarContext';
import useDevice from '../../util/device';
import { IconButton } from '../Buttons/IconButton';
import ProfileImage, { IPAD_PROFILE_IMAGE_SCALE } from '../ProfileImage';
import useQueryGetFollowingUsers from '../../hooks/queries/useQueryGetFollowingUsers';

const IMAGE_WIDTH = 50;
const IMAGE_MARGIN = 5;

// always the auth user
const FollowingBottomScroll = ({
  onPress,
}: {
  onPress: (
    userId: string,
    userName: string | undefined,
    userImage: string | undefined,
  ) => void;
}) => {
  const friendsYPos = useRef(new Animated.Value(0)).current;
  const { event } = useEvent();
  const { isHidden, setIsHidden } = useFollowingBar();
  const { data: followingUsers } = useQueryGetFollowingUsers();
  const { isPad } = useDevice();

  const usersPredictingEvent = (followingUsers ?? []).filter((user) =>
    (user.eventsPredicting ?? []).some((e) => e === event?._id),
  );

  useEffect(() => {
    Animated.timing(friendsYPos, {
      toValue: isHidden ? 100 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isHidden]);

  if (usersPredictingEvent.length === 0) return null;

  return (
    <>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: 10,
          zIndex: 2,
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
          zIndex: 1,
          position: 'absolute',
          bottom: 0,
          alignItems: 'center',
          flexDirection: 'row',
          transform: [{ translateY: friendsYPos }],
        }}
      >
        <ScrollView
          horizontal
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 80,
          }}
        >
          {usersPredictingEvent.map((user) => (
            <ProfileImage
              key={user._id}
              image={user.image}
              imageSize={IMAGE_WIDTH}
              onPress={() => onPress(user._id, user.name, user.image)}
              style={{
                width: (IMAGE_WIDTH + 6) * (isPad ? IPAD_PROFILE_IMAGE_SCALE : 1), // this only makes sense because the profile image is equally scaled
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
