import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import useGetLeaderboardUsers from '../../../hooks/useGetLeaderboardUsers';
import { FlatList, Keyboard, TouchableHighlight, View } from 'react-native';
import useDevice from '../../../util/device';
import LeaderboardListItem, {
  LEADERBOARD_PROFILE_IMAGE_SIZE,
} from '../../../components/LeaderboardListItem';
import UserListSkeleton from '../../../components/Skeletons/UserListSkeleton';
import { SubHeader } from '../../../components/Text';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import COLORS from '../../../constants/colors';
import { formatDecimalAsPercentage } from '../../../util/formatPercentage';
import { useAuth } from '../../../context/AuthContext';
import useProfileUser from '../../Profile/useProfileUser';
import { getUserLeaderboard } from '../../../util/getUserLeaderboard';
import { getTwoLineHeaderTitle } from '../../../constants';
import { eventToString } from '../../../util/stringConversions';
import { useRouteParams } from '../../../hooks/useRouteParams';
import { PHASE_TO_STRING } from '../../../constants/categories';
import Stat from '../../../components/ItemStatBox/Stat';
import LeaderboardChart from '../../../components/LeaderboardChart';

const Leaderboard = () => {
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
            <TouchableHighlight
              style={{
                flexDirection: 'row',
                width: '100%',
              }}
              onPress={() => {}}
              underlayColor={COLORS.secondaryDark}
            >
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flex: 1,
                  padding: 10,
                  paddingVertical: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    margin: 10,
                    marginTop: 0,
                  }}
                >
                  <SubHeader>Community Aggregate</SubHeader>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-around',
                    alignItems: 'flex-end',
                  }}
                >
                  <Stat
                    number={`${formatDecimalAsPercentage(
                      leaderboard.communityPercentageAccuracy,
                    )}%`}
                    text="accuracy"
                  />
                  <Stat
                    number={`${leaderboard.communityNumCorrect}/${leaderboard.totalPossibleSlots}`}
                    text="correct"
                  />
                  <Stat
                    number={`${
                      leaderboard.numPredicted -
                      leaderboard.communityPerformedBetterThanNumUsers
                    }/${leaderboard.numPredicted}`}
                    text="rank"
                  />
                </View>
              </View>
            </TouchableHighlight>
            {/* <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                width: '100%',
                alignItems: 'center',
                padding: 10,
              }}
            >
              <SubHeader>Num predicting / % Accuracy</SubHeader>
            </View> */}
            <LeaderboardChart leaderboard={leaderboard} />
            <View
              style={{
                height: 0.5,
                width: '100%',
                backgroundColor: COLORS.white,
                marginTop: 5,
                marginBottom: 5,
              }}
            />
            {/* TODO: Display auth user now. Can get from the user object. */}
            {user && userLeaderboard ? (
              <LeaderboardListItem
                leaderboardRanking={{ userId: user._id, ...user, ...userLeaderboard }}
              />
            ) : null}
            <View
              style={{
                height: 0.5,
                width: '100%',
                backgroundColor: COLORS.white,
                marginTop: 5,
                marginBottom: 5,
              }}
            />
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
