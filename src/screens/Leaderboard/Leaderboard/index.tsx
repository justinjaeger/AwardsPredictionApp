import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import useGetLeaderboardUsers from '../../../hooks/useGetLeaderboardUsers';
import { FlatList, Keyboard } from 'react-native';
import useDevice from '../../../util/device';
import LeaderboardListItem, {
  LEADERBOARD_PROFILE_IMAGE_SIZE,
} from '../../../components/LeaderboardListItem';
import useQueryGetFollowingUsers from '../../../hooks/queries/useQueryGetFollowingUsers';
import UserListSkeleton from '../../../components/Skeletons/UserListSkeleton';
import { SubHeader } from '../../../components/Text';
import { useGetEventsWithLeaderboard } from '../../../hooks/useGetEventsWithLeaderboard';
import {
  PredictionsNavigationProp,
  PredictionsParamList,
  iUserInfo,
} from '../../../navigation/types';
import { getUserInfo } from '../../../util/getUserInfo';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { User, WithId } from '../../../types/api';

/**
 * First, we need a screen with Leaderboard Selection
 */
const Leaderboard = () => {
  const { isPad } = useDevice();
  const {
    params: { eventId, phase, noShorts },
  } = useRoute<RouteProp<PredictionsParamList, 'Leaderboard'>>();
  const navigation = useNavigation<PredictionsNavigationProp>();

  const events = useGetEventsWithLeaderboard();
  const event = events.find((e) => e._id === eventId);
  const leaderboard =
    event?.leaderboards &&
    Object.values(event.leaderboards).find(
      (l) => l.phase === phase && !!l.noShorts === !!noShorts,
    );

  const { leaderboardRankings, fetchPage, isLoading } = useGetLeaderboardUsers({
    eventId,
    phase,
    noShorts,
  });
  const { usersIdsAuthUserIsFollowing } = useQueryGetFollowingUsers();

  const onEndReached = () => {
    fetchPage();
  };

  const navigateToPredictions = (userInfo: iUserInfo, yyyymmdd: number) => {
    navigation.navigate('Event', {
      eventId,
      userInfo,
      yyyymmdd,
    });
  };

  if (!leaderboard) return null;

  return (
    <BackgroundWrapper>
      <FlatList
        data={leaderboardRankings}
        keyExtractor={(item) => item.userId}
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        onScroll={(e) => {
          Keyboard.dismiss();
          // Fetches more at bottom of scroll. Note the high event throttle to prevent too many requests
          // get position of current scroll
          const currentOffset = e.nativeEvent.contentOffset.y;
          // get max bottom of scroll
          const maxOffset =
            e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height;
          // if we're close to the bottom fetch more
          if (currentOffset > maxOffset - 200 && onEndReached) {
            onEndReached();
          }
        }}
        scrollEventThrottle={500}
        onEndReachedThreshold={isPad ? 0.8 : 0.5} // triggers onEndReached at (X*100)% of list, for example 0.9 = 90% down
        keyboardShouldPersistTaps={'always'}
        ListHeaderComponent={<SubHeader>{`${leaderboard.numPredicted} users`}</SubHeader>}
        ListFooterComponent={
          isLoading ? (
            <UserListSkeleton imageSize={LEADERBOARD_PROFILE_IMAGE_SIZE} numResults={3} />
          ) : null
        }
        renderItem={({ item }) => {
          if (!item) return null;
          return (
            <LeaderboardListItem
              leaderboardRanking={item}
              authUserIsFollowing={usersIdsAuthUserIsFollowing.includes(item.userId)}
              onPress={() => {
                if (!item) return;
                const userInfo = getUserInfo(item as WithId<User>);
                userInfo && navigateToPredictions(userInfo, item.yyyymmdd);
              }}
            />
          );
        }}
      />
    </BackgroundWrapper>
  );
};

export default Leaderboard;
