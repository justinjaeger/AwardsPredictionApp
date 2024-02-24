import React, { useRef, useState } from 'react';
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
import { PHASE_TO_STRING_PLURAL } from '../../../constants/categories';
import LeaderboardChart from '../../../components/LeaderboardChart';
import { PredictionsNavigationProp } from '../../../navigation/types';
import { getUserInfo } from '../../../util/getUserInfo';
import { usePersonalCommunityTab } from '../../../context/PersonalCommunityContext';
import useQueryGetFollowingUsers from '../../../hooks/queries/useQueryGetFollowingUsers';
import { iLeaderboardRankingsWithUserData } from '../../../services/api/requests/leaderboard';
import useQueryGetAllEvents from '../../../hooks/queries/useQueryGetAllEvents';
import { AWARDS_BODY_TO_PLURAL_STRING } from '../../../constants/awardsBodies';
import LeaderboardStats from './LeaderboardStats';
import HeaderDropdownOverlay from '../../../components/HeaderDropdownOverlay';
import HeaderWithLeaderboardSelect, {
  HEADER_TITLE_HEIGHT,
  HEADER_TITLE_MARGIN_TOP,
  HEADER_TOP_TAB_MARGIN_BOTTOM,
  HEADER_TOP_TAB_MARGIN_TOP,
} from '../../../components/HeaderWithLeaderboardSelect';
import { EVENT_TOP_TABS_HEIGHT } from '../../../components/HorizontalScrollingTabs';
import { useEventSelect } from '../../../hooks/useEventSelect';
import SectionTopTabs from '../../../components/SectionTopTabs';
import DynamicHeaderFlatListWrapper from '../../../components/DynamicHeaderWrapper/DynamicHeaderFlatListWrapper';
import COLORS from '../../../constants/colors';

const Leaderboard = () => {
  const verticalScrollRef = useRef<ScrollView>(null);
  const flatListRef = useRef<FlatList<any>>(null);

  const navigation = useNavigation<PredictionsNavigationProp>();

  const { setPersonalCommunityTab } = usePersonalCommunityTab();
  const { data: events } = useQueryGetAllEvents();
  const { event, setEvent, setYear, phase, setPhase, leaderboard } = useEventSelect();

  const { userId: authUserId } = useAuth();
  const { user } = useProfileUser(authUserId);
  const { leaderboardRankings, fetchPage, isLoading } = useGetLeaderboardUsers({
    eventId: event?._id,
    phase,
  });
  const { data: users } = useQueryGetFollowingUsers();

  const eventsWithLeaderboard =
    events?.filter(
      (event) => event.leaderboards && Object.keys(event.leaderboards).length > 0,
    ) ?? [];

  const [sortSetting, setSortSetting] = useState<'all' | 'following'>('all');

  if (!event || !phase) return null;

  const eventId = event?._id;

  const userLeaderboard =
    user && getUserLeaderboard({ user, eventId: event?._id, phase });

  const followingLeaderboardRankings = (users ?? [])
    .reduce((acc: iLeaderboardRankingsWithUserData[], user) => {
      const userLeaderboard = getUserLeaderboard({ user, eventId, phase });
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
      <DynamicHeaderFlatListWrapper<iLeaderboardRankingsWithUserData>
        scrollViewRef={verticalScrollRef}
        topOnlyContent={{
          height:
            HEADER_TITLE_HEIGHT +
            HEADER_TITLE_MARGIN_TOP +
            EVENT_TOP_TABS_HEIGHT +
            HEADER_TOP_TAB_MARGIN_BOTTOM +
            HEADER_TOP_TAB_MARGIN_TOP,
          component: (
            <View
              style={{
                borderBottomColor: COLORS.primaryLight,
                borderBottomWidth: 1,
              }}
            >
              <HeaderWithLeaderboardSelect
                title={'Leaderboards'}
                event={event}
                phase={phase}
                setLeaderboard={(event, phase) => {
                  setPhase(phase);
                  setEvent(event);
                }}
                eventOptions={eventsWithLeaderboard}
                setYear={setYear}
              />
            </View>
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
          initialNumToRender: 10,
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
