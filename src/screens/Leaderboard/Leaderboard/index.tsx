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
import { Body, BodyBold, HeaderLight, SubHeader } from '../../../components/Text';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { useAuth } from '../../../context/AuthContext';
import useProfileUser from '../../Profile/useProfileUser';
import { getUserLeaderboard } from '../../../util/getUserLeaderboard';
import { getTwoLineHeaderTitle } from '../../../constants';
import { eventToString } from '../../../util/stringConversions';
import { useRouteParams } from '../../../hooks/useRouteParams';
import { PHASE_TO_STRING, PHASE_TO_STRING_PLURAL } from '../../../constants/categories';
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
import { EventModel, Phase, WithId } from '../../../models';
import useQueryGetAllEvents from '../../../hooks/queries/useQueryGetAllEvents';
import { AWARDS_BODY_TO_PLURAL_STRING } from '../../../constants/awardsBodies';
import EventTopTabs from '../../../components/EventTopTabs';
import LeaderboardStats from './LeaderboardStats';
import { getLastUpdatedOnPredictionSet } from '../../../util/getLastUpdatedOnPredictionSet';

const Leaderboard = () => {
  const flatListRef = useRef<FlatList<any>>(null);

  const { width } = useWindowDimensions();
  const { event: initialEvent, phase: initialPhase } = useRouteParams();

  const { setPersonalCommunityTab } = usePersonalCommunityTab();
  const { defaultEvent, defaultLeaderboard } = useQueryGetAllEvents();

  const { isPad } = useDevice();
  const navigation = useNavigation<PredictionsNavigationProp>();

  const [event, setEvent] = useState<WithId<EventModel> | undefined>(initialEvent);
  const [phase, setPhase] = useState<Phase | undefined>(initialPhase);

  // sets event as most recent academy awards if none is selected
  useEffect(() => {
    if (!event && defaultEvent) {
      setEvent(defaultEvent);
    }
    if (!phase && defaultLeaderboard) {
      setPhase(defaultLeaderboard.phase);
    }
  }, [defaultEvent, defaultLeaderboard]);

  const widthFactor = isPad ? theme.padHistogramContainerWidth : 1;
  const noShorts = false;

  const { userId: authUserId } = useAuth();
  const { user } = useProfileUser(authUserId);
  const { leaderboardRankings, fetchPage, isLoading } = useGetLeaderboardUsers({
    eventId: event?._id,
    phase,
    noShorts,
  });
  const { data: users } = useQueryGetFollowingUsers();

  const [sortSetting, setSortSetting] = useState<'all' | 'following'>('all');

  // set custom back arrow functionality
  useEffect(() => {
    if (!event || !phase) return;
    const eventName = eventToString(event.awardsBody, event.year);
    const headerTitle = `${eventName}\n${PHASE_TO_STRING[phase]} Leaderboard`;
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerTitle: getTwoLineHeaderTitle(headerTitle),
    });
  }, [navigation]);

  if (!event || !phase) return null;

  const eventId = event?._id;

  const userLeaderboard =
    user && getUserLeaderboard({ user, eventId: event?._id, phase });

  const leaderboard = getLeaderboardFromEvent(event, phase, noShorts);

  const followingLeaderboardRankings = (users ?? [])
    .reduce((acc: iLeaderboardRankingsWithUserData[], user) => {
      const userLeaderboard = getUserLeaderboard({ user, eventId, phase, noShorts });
      if (userLeaderboard) {
        acc.push({ ...userLeaderboard, ...user, userId: user._id });
      }
      return acc;
    }, [] as any[])
    .sort((a, b) => a.rank - b.rank);

  const onEndReached = () => {
    fetchPage();
  };

  if (!leaderboard) return null;

  const data = sortSetting === 'all' ? leaderboardRankings : followingLeaderboardRankings;

  const navigateToPredictions = () => {
    if (!userLeaderboard) return;
    setPersonalCommunityTab('personal');
    navigation.navigate('Event', {
      eventId: userLeaderboard.eventId,
      userInfo: getUserInfo(user),
      yyyymmdd: userLeaderboard.yyyymmdd,
      phase: userLeaderboard.phase,
      isLeaderboard: true,
    });
  };

  return (
    <BackgroundWrapper>
      <HeaderLight
        style={{
          alignSelf: 'flex-start',
          marginTop: 10,
          marginLeft: theme.windowMargin,
        }}
      >
        {'Leaderboard'}
      </HeaderLight>
      <BodyBold
        style={{
          alignSelf: 'flex-start',
          marginTop: 5,
          marginLeft: theme.windowMargin,
        }}
      >
        {`${AWARDS_BODY_TO_PLURAL_STRING[event.awardsBody]} ${event.year} • ${
          PHASE_TO_STRING_PLURAL[phase]
        }`}
      </BodyBold>
      {event ? <EventTopTabs selectedEvent={event} setEvent={setEvent} /> : null}
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
              <LeaderboardStats
                title={'My Score'}
                percentageAccuracy={userLeaderboard.percentageAccuracy}
                numCorrect={userLeaderboard.numCorrect}
                totalPossibleSlots={userLeaderboard.totalPossibleSlots}
                numUsersPredicting={userLeaderboard.numUsersPredicting}
                rank={userLeaderboard.rank}
                riskiness={userLeaderboard.riskiness}
                lastUpdated={userLeaderboard.lastUpdated}
                slotsPredicted={userLeaderboard.slotsPredicted}
                onPress={() => navigateToPredictions()}
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
