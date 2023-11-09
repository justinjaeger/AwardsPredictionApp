import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView } from 'react-native';
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
  const indicatorYPos = useRef(new Animated.Value(0)).current;
  const { event, category } = useEvent();
  const { isHidden, setIsHidden, hideAbsolutely } = useFollowingBar();
  const { data: followingUsers } = useQueryGetFollowingUsers();
  const { isPad } = useDevice();

  const usersPredictingEvent = (followingUsers ?? []).filter((user) =>
    Object.keys(user.eventsPredicting ?? {}).some((e) => e === event?._id),
  );
  const usersPredictingCategory = usersPredictingEvent.filter((user) =>
    Object.entries(user.eventsPredicting ?? {}).some(
      ([e, categories]) => e === event?._id && categories.includes(category),
    ),
  );
  const usersPredictingCurrent = category
    ? usersPredictingCategory
    : usersPredictingEvent;

  useEffect(() => {
    Animated.timing(friendsYPos, {
      toValue: isHidden ? 0 : 100,
      duration: 250,
      useNativeDriver: true,
    }).start();
    Animated.timing(indicatorYPos, {
      toValue: isHidden ? 0 : 60,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isHidden]);

  if (usersPredictingCurrent.length === 0 || hideAbsolutely) return null;

  return (
    <>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 70,
          alignItems: 'center',
          flexDirection: 'row',
          zIndex: 2,
          transform: [{ translateY: indicatorYPos }],
        }}
      >
        <IconButton
          iconProps={{
            name: isHidden ? 'chevron-down-outline' : 'people-outline',
          }}
          color={COLORS.white}
          styles={{
            backgroundColor: COLORS.secondaryDark,
            marginLeft: theme.windowMargin,
            padding: 3,
          }}
          onPress={() => setIsHidden(!isHidden)}
        />
      </Animated.View>
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
          }}
        >
          {usersPredictingCurrent.map((user) => (
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
                shadowRadius: 5,
                shadowColor: 'black',
                shadowOpacity: 0.5,
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
