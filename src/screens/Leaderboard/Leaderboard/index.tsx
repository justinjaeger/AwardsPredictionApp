import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import useGetLeaderboardUsers from '../../../hooks/useGetLeaderboardUsers';
import { FlatList, Keyboard, View } from 'react-native';
import useDevice from '../../../util/device';
import LeaderboardListItem, {
  LEADERBOARD_PROFILE_IMAGE_SIZE,
} from '../../../components/LeaderboardListItem';
import UserListSkeleton from '../../../components/Skeletons/UserListSkeleton';
import { Body, SubHeader } from '../../../components/Text';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { useAuth } from '../../../context/AuthContext';
import useProfileUser from '../../Profile/useProfileUser';
import { getUserLeaderboard } from '../../../util/getUserLeaderboard';
import { getTwoLineHeaderTitle } from '../../../constants';
import { eventToString } from '../../../util/stringConversions';
import { useRouteParams } from '../../../hooks/useRouteParams';
import { PHASE_TO_STRING } from '../../../constants/categories';
import LeaderboardChart from '../../../components/LeaderboardChart';
import LeaderboardStats from './LeaderboardStats';

const Leaderboard = () => {
  const flatListRef = useRef<FlatList<any>>(null);

  const { isPad } = useDevice();
  const navigation = useNavigation();
  const { event, eventId: _eventId, phase: _phase, noShorts } = useRouteParams();
  const eventId = _eventId!;
  const phase = _phase!;

  const { userId: authUserId } = useAuth();
  const { user } = useProfileUser(authUserId);
  const userLeaderboard = user && getUserLeaderboard({ user, eventId, phase, noShorts });

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

  // set custom back arrow functionality
  useEffect(() => {
    if (!event) return;
    const eventName = eventToString(event.awardsBody, event.year);
    const headerTitle = `${eventName}\n${PHASE_TO_STRING[phase]} Leaderboard`;
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerTitle: getTwoLineHeaderTitle(headerTitle),
    });
  }, [navigation]);

  const onEndReached = () => {
    fetchPage();
  };

  if (!leaderboard) return null;

  return (
    <BackgroundWrapper>
      <FlatList
        ref={flatListRef}
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
        ListHeaderComponent={
          <>
            <LeaderboardStats
              title={'Community Scores'}
              subtitle={'The aggregate of all users'}
              percentageAccuracy={leaderboard.communityPercentageAccuracy}
              numCorrect={leaderboard.communityNumCorrect}
              totalPossibleSlots={leaderboard.totalPossibleSlots}
              numPredicted={leaderboard.numPredicted}
              rank={
                leaderboard.numPredicted -
                leaderboard.communityPerformedBetterThanNumUsers
              }
              onPress={() => {
                // TODO: Navigate to community predictions
              }}
            />
            {/* {user && userLeaderboard ? (
              <LeaderboardStats
                title={'Your Scores'}
                percentageAccuracy={userLeaderboard.percentageAccuracy}
                numCorrect={userLeaderboard.numCorrect}
                totalPossibleSlots={userLeaderboard.totalPossibleSlots}
                numPredicted={leaderboard.numPredicted}
                rank={userLeaderboard.rank}
                onPress={() => {
                  // TODO: Navigate to user's predictions
                }}
              />
            ) : null} */}
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                width: '100%',
                alignItems: 'center',
                padding: 20,
                paddingBottom: 10,
              }}
            >
              <SubHeader>Score Distribution</SubHeader>
              <Body style={{ marginTop: 5 }}>All Users</Body>
            </View>
            <LeaderboardChart leaderboard={leaderboard} flatListRef={flatListRef} />
            {/* TODO: Display auth user now. Can get from the user object. */}
            {user && userLeaderboard ? (
              <LeaderboardListItem
                leaderboardRanking={{ userId: user._id, ...user, ...userLeaderboard }}
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              />
            ) : null}
          </>
        }
        ListFooterComponent={
          isLoading ? (
            <UserListSkeleton
              imageSize={LEADERBOARD_PROFILE_IMAGE_SIZE}
              numResults={10}
            />
          ) : null
        }
        renderItem={({ item }) => {
          if (!item) return null;
          return <LeaderboardListItem leaderboardRanking={item} />;
        }}
      />
    </BackgroundWrapper>
  );
};

export default Leaderboard;
