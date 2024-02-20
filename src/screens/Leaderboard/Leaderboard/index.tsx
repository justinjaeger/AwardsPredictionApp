import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import useGetLeaderboardUsers from '../../../hooks/useGetLeaderboardUsers';
import { FlatList, ScrollView, View } from 'react-native';
import LeaderboardListItem, {
  LEADERBOARD_PROFILE_IMAGE_SIZE,
} from '../../../components/LeaderboardListItem';
import UserListSkeleton from '../../../components/Skeletons/UserListSkeleton';
import { Body, SubHeader } from '../../../components/Text';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { useAuth } from '../../../context/AuthContext';
import useProfileUser from '../../Profile/useProfileUser';
import { getUserLeaderboard } from '../../../util/getUserLeaderboard';
import { useRouteParams } from '../../../hooks/useRouteParams';
import { PHASE_TO_STRING_PLURAL } from '../../../constants/categories';
import LeaderboardChart from '../../../components/LeaderboardChart';
import { PredictionsNavigationProp } from '../../../navigation/types';
import { getLeaderboardFromEvent } from '../../../util/getLeaderboardFromEvent';
import { getUserInfo } from '../../../util/getUserInfo';
import { usePersonalCommunityTab } from '../../../context/EventContext';
import useQueryGetFollowingUsers from '../../../hooks/queries/useQueryGetFollowingUsers';
import { iLeaderboardRankingsWithUserData } from '../../../services/api/requests/leaderboard';
import { Phase } from '../../../models';
import useQueryGetAllEvents from '../../../hooks/queries/useQueryGetAllEvents';
import { AWARDS_BODY_TO_PLURAL_STRING } from '../../../constants/awardsBodies';
import LeaderboardStats from './LeaderboardStats';
import HeaderDropdownOverlay from '../../../components/HeaderDropdownOverlay';
import HeaderWithEventSelect, {
  HEADER_TITLE_HEIGHT,
  HEADER_TITLE_MARGIN_TOP,
  HEADER_TOP_TAB_MARGIN_BOTTOM,
} from '../../../components/HeaderWithEventSelect';
import { EVENT_TOP_TABS_HEIGHT } from '../../../components/HorizontalScrollingTabs';
import { useEventSelect } from '../../../hooks/useEventSelect';
import CollapsableHeaderFlatListWrapper from '../../../components/CollapsableHeaderFlatListWrapper';
import SectionTopTabs from '../../../components/SectionTopTabs';

const Leaderboard = () => {
  const verticalScrollRef = useRef<ScrollView>(null);
  const flatListRef = useRef<FlatList<any>>(null);

  const { phase: initialPhase } = useRouteParams();
  const navigation = useNavigation<PredictionsNavigationProp>();

  const { setPersonalCommunityTab } = usePersonalCommunityTab();
  const { data: events, defaultLeaderboard } = useQueryGetAllEvents();
  const { event, year, yyyymmdd, setEvent, setYear } = useEventSelect();

  const [phase, setPhase] = useState<Phase | undefined>(initialPhase);

  // sets event as most recent academy awards if none is selected
  useEffect(() => {
    if (!phase && defaultLeaderboard) {
      setPhase(defaultLeaderboard.phase);
    }
  }, [defaultLeaderboard]);

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
      <HeaderDropdownOverlay />
      <CollapsableHeaderFlatListWrapper<iLeaderboardRankingsWithUserData>
        scrollViewRef={verticalScrollRef}
        topOnlyContent={{
          height:
            HEADER_TITLE_HEIGHT +
            HEADER_TITLE_MARGIN_TOP +
            EVENT_TOP_TABS_HEIGHT +
            HEADER_TOP_TAB_MARGIN_BOTTOM,
          component: (
            <HeaderWithEventSelect
              title={'Leaderboards'}
              event={event}
              setEvent={setEvent}
              eventOptions={events ?? []}
              setYear={setYear}
            />
          ),
        }}
        titleWhenCollapsed={`${AWARDS_BODY_TO_PLURAL_STRING[event.awardsBody]} ${
          event.year
        } • ${PHASE_TO_STRING_PLURAL[phase]}`}
        // FLAT LIST PROPS:
        flatListProps={{
          ref: flatListRef,
          data,
          keyExtractor: (item) => item.userId,
          renderItem: ({ item }) => {
            if (!item) return <></>;
            return <LeaderboardListItem leaderboardRanking={item} />;
          },
          ListHeaderComponent: (
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
                <SectionTopTabs
                  tabs={[
                    {
                      title: 'All Users',
                      onOpenTab: () => setSortSetting('all'),
                    },
                    {
                      title: 'Following',
                      onOpenTab: () => setSortSetting('following'),
                    },
                  ]}
                />
              ) : null}
            </>
          ),
          ListFooterComponent: (
            <>
              {isLoading ? (
                <UserListSkeleton
                  imageSize={LEADERBOARD_PROFILE_IMAGE_SIZE}
                  numResults={10}
                />
              ) : null}
            </>
          ),
        }}
        onEndReached={onEndReached}
      />
    </BackgroundWrapper>
  );
};

export default Leaderboard;
