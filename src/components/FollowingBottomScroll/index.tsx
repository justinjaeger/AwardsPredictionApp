import React from 'react';
import COLORS from '../../constants/colors';
import { useFollowingBar } from '../../context/FollowingBarContext';
import useDevice from '../../util/device';
import ProfileImage, { IPAD_PROFILE_IMAGE_SCALE } from '../ProfileImage';
import useQueryGetFollowingUsers from '../../hooks/queries/useQueryGetFollowingUsers';
import { useRouteParams } from '../../hooks/useRouteParams';
import { ScrollView } from 'react-native-gesture-handler';

const IMAGE_WIDTH = 50;
const IMAGE_MARGIN = 5;

// always the auth user
const FollowingBottomScroll = ({ onPress }: { onPress: (userId: string) => void }) => {
  const { eventId, category } = useRouteParams();
  const { hideAbsolutely } = useFollowingBar();
  const { data: followingUsers } = useQueryGetFollowingUsers();
  const { isPad } = useDevice();

  const usersPredictingEvent = (followingUsers ?? []).filter((user) =>
    Object.keys(user.eventsPredicting ?? {}).some((e) => e === eventId),
  );
  const usersPredictingCategory =
    category &&
    usersPredictingEvent.filter(
      (user) =>
        user.image &&
        Object.entries(user.eventsPredicting ?? {}).some(
          ([e, categories]) => e === eventId && categories.includes(category),
        ),
    );
  const usersPredictingCurrent = usersPredictingCategory || usersPredictingEvent;

  if (usersPredictingCurrent.length === 0 || hideAbsolutely) return null;

  return (
    <ScrollView
      horizontal
      scrollEnabled={true}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {usersPredictingCurrent.map((user) => (
        <ProfileImage
          key={user._id}
          user={user}
          imageSize={IMAGE_WIDTH}
          onPress={() => onPress(user._id)}
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
  );
};

export default FollowingBottomScroll;
