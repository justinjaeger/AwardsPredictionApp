import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import useGetLeaderboardUsers from '../../../hooks/useGetLeaderboardUsers';
import { FlatList, Keyboard, View, useWindowDimensions } from 'react-native';
import useDevice from '../../../util/device';
import LeaderboardListItem, {
  LEADERBOARD_PROFILE_IMAGE_SIZE,
} from '../../../components/LeaderboardListItem';
import LeaderboardListItemTemplate from '../../../components/LeaderboardListItem/Template';
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
import { PredictionsNavigationProp } from '../../../navigation/types';
import { getLeaderboardFromEvent } from '../../../util/getLeaderboardFromEvent';
import { getUserInfo } from '../../../util/getUserInfo';
import { usePersonalCommunityTab } from '../../../context/EventContext';
import PredictionTab from '../../../navigation/PredictionTabsNavigator/PredictionTab';
import COLORS from '../../../constants/colors';
import theme from '../../../constants/theme';
import useQueryGetFollowingUsers from '../../../hooks/queries/useQueryGetFollowingUsers';
import { iLeaderboardRankingsWithUserData } from '../../../services/api/requests/leaderboard';

const Leaderboard = () => {
  const flatListRef = useRef<FlatList<any>>(null);

  const { width } = useWindowDimensions();

  const { setPersonalCommunityTab } = usePersonalCommunityTab();

  const { isPad } = useDevice();
  const navigation = useNavigation<PredictionsNavigationProp>();
  const { event: _event, eventId: _eventId, phase: _phase, noShorts } = useRouteParams();
  const eventId = _eventId!;
  const phase = _phase!;
  const event = _event!;

  const widthFactor = isPad ? theme.padHistogramContainerWidth : 1;

  const { userId: authUserId } = useAuth();
  const { user } = useProfileUser(authUserId);
  const userLeaderboard = user && getUserLeaderboard({ user, eventId, phase, noShorts });

  const leaderboard = getLeaderboardFromEvent(event, phase, noShorts);

  const { leaderboardRankings, fetchPage, isLoading } = useGetLeaderboardUsers({
    eventId,
    phase,
    noShorts,
  });
  const { data: users } = useQueryGetFollowingUsers();
  const followingLeaderboardRankings = (users ?? [])
    .reduce((acc: iLeaderboardRankingsWithUserData[], user) => {
      const userLeaderboard = getUserLeaderboard({ user, eventId, phase, noShorts });
      if (userLeaderboard) {
        acc.push({ ...userLeaderboard, ...user, userId: user._id });
      }
      return acc;
    }, [] as any[])
    .sort((a, b) => a.rank - b.rank);

  const [sortSetting, setSortSetting] = useState<'all' | 'following'>('all');

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

  const data = sortSetting === 'all' ? leaderboardRankings : followingLeaderboardRankings;

  return (
    <BackgroundWrapper>
      <FlatList
        ref={flatListRef}
        data={data}
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
            {user && userLeaderboard ? (
              <LeaderboardListItem
                leaderboardRanking={{ userId: user._id, ...user, ...userLeaderboard }}
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              />
            ) : null}
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
            <LeaderboardListItemTemplate
              title={'Community'}
              subtitle={'Aggregate of all users'}
              percentageAccuracy={leaderboard.communityPercentageAccuracy}
              numCorrect={leaderboard.communityNumCorrect}
              totalPossibleSlots={leaderboard.totalPossibleSlots}
              rank={
                leaderboard.numUsersPredicting -
                leaderboard.communityPerformedBetterThanNumUsers
              }
              onPress={() => {
                const yyyymmdd = leaderboardRankings[0]?.yyyymmdd;
                if (!yyyymmdd) return;
                setPersonalCommunityTab('community');
                navigation.navigate('Event', {
                  eventId,
                  yyyymmdd,
                  phase,
                  userInfo: getUserInfo(user),
                  isLeaderboard: true,
                  noShorts,
                });
              }}
              profileImage={undefined}
              riskiness={leaderboard.communityRiskiness}
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              hideProfileImage
            />
            {authUserId ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  width: width * widthFactor,
                  borderRadius: 0,
                  borderColor: COLORS.primaryLight,
                  borderWidth: 1,
                  marginTop: 10,
                }}
              >
                <PredictionTab
                  text="All Users"
                  selected={sortSetting === 'all'}
                  onPress={() => setSortSetting('all')}
                />
                <View style={{ width: 1, backgroundColor: COLORS.primaryLight }} />
                <PredictionTab
                  text="Following"
                  selected={sortSetting === 'following'}
                  onPress={() => setSortSetting('following')}
                />
              </View>
            ) : null}
            {/* <LeaderboardListItemTemplate
              title={'Community'}
              subtitle={'Aggregate of all users'}
              percentageAccuracy={leaderboard.communityPercentageAccuracy}
              numCorrect={leaderboard.communityNumCorrect}
              totalPossibleSlots={leaderboard.totalPossibleSlots}
              rank={
                leaderboard.numUsersPredicting -
                leaderboard.communityPerformedBetterThanNumUsers
              }
              onPress={() => {
                const yyyymmdd = leaderboardRankings[0]?.yyyymmdd;
                if (!yyyymmdd) return;
                setPersonalCommunityTab('community');
                navigation.navigate('Event', {
                  eventId,
                  yyyymmdd,
                  phase,
                  userInfo: getUserInfo(user),
                  isLeaderboard: true,
                  noShorts,
                });
              }}
              profileImage={undefined}
              riskiness={leaderboard.communityRiskiness}
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              hideProfileImage
            /> */}
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
