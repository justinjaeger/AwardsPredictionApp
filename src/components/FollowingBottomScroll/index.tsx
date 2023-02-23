// import { Spinner } from '@ui-kitten/components';
import React from 'react';
import {
  ScrollView,
  // useWindowDimensions,
  View,
} from 'react-native';
// import COLORS from '../../constants/colors';
import { useCategory } from '../../context/CategoryContext';
import useFriendsPredictingEvent from '../../hooks/useFriendsPredictingEvent';
// import usePaginatedFriends from '../../hooks/usePaginatedFriends';
import ProfileImage from '../ProfileImage';

// NOTE: Leaving commented-out code because I'm not sure if this new solution with useFriendsPredictingEvent works, so might revert
const FollowingBottomScroll = ({
  userId,
  onPress,
}: {
  userId: string;
  onPress: (userId: string) => void;
}) => {
  //   const { width } = useWindowDimensions();
  const { event } = useCategory();

  //   const {
  //     users,
  //     fetchPage,
  //     isLoading: isFetchingFriends,
  //     hasFetchedAll,
  //   } = usePaginatedFriends({
  //     userId,
  //     type: 'following',
  //   });
  const { data: users } = useFriendsPredictingEvent(userId, event?.id);

  const imageWidth = 50;
  const imageMargin = 5;
  //   const lastImagePosition = (users.length - 1) * (imageWidth + imageMargin * 2);

  if (!users || users.length === 0) return null;

  return (
    <View
      style={{
        backgroundColor: 'rgba(255,255,255,0.1)',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <ScrollView
        horizontal
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        // onScrollEndDrag={({ nativeEvent }) => {
        // once we hit the scroll limit, we want to fetch the next page of users
        //   const scrollLimit = lastImagePosition - width + imageWidth + imageMargin * 2;
        //   const x = nativeEvent.contentOffset.x; // current position of the scrollview
        //   if (x >= scrollLimit) {
        //     !isFetchingFriends && fetchPage(); // this should be debounced
        //   }
        // }}
      >
        <>
          {users.map((user) => (
            <ProfileImage
              key={user.id}
              image={user.image}
              imageSize={imageWidth}
              onPress={() => onPress(user.id)}
              style={{ margin: imageMargin }}
            />
          ))}
          {/* {!hasFetchedAll ? (
            <View style={{ marginLeft: 5 }}>
              <Spinner size="medium" style={{ borderColor: COLORS.gray }} />
            </View>
          ) : null} */}
        </>
      </ScrollView>
    </View>
  );
};

export default FollowingBottomScroll;
