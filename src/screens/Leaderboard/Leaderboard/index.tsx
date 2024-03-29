import React, { useRef, useState } from 'react';
import useGetLeaderboardUsers from '../../../hooks/useGetLeaderboardUsers';
import { View } from 'react-native';
import LeaderboardListItem from '../../../components/LeaderboardListItem';
import UserListSkeleton from '../../../components/Skeletons/UserListSkeleton';
import { SubHeader } from '../../../components/Text';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { useAuth } from '../../../context/AuthContext';
import useProfileUser from '../../Profile/useProfileUser';
import { getUserLeaderboard } from '../../../util/getUserLeaderboard';
import { PHASE_TO_STRING_PLURAL } from '../../../constants/categories';
import LeaderboardChart from '../../../components/LeaderboardChart';
import useQueryGetFollowingUsers from '../../../hooks/queries/useQueryGetFollowingUsers';
import { iLeaderboardRankingsWithUserData } from '../../../services/api/requests/leaderboard';
import { AWARDS_BODY_TO_PLURAL_STRING } from '../../../constants/awardsBodies';
import HeaderDropdownOverlay from '../../../components/HeaderDropdownOverlay';
import { EVENT_TOP_TABS_HEIGHT } from '../../../components/HorizontalScrollingTabs';
import { useEventSelect } from '../../../hooks/useEventSelect';
import SectionTopTabs from '../../../components/SectionTopTabs';
import DynamicHeaderFlatListWrapper from '../../../components/DynamicHeaderWrapper/DynamicHeaderFlatListWrapper';
import { useRouteParams } from '../../../hooks/useRouteParams';
import LeaderboardTopTabs from '../../../components/HeaderComponents/LeaderboardTabs';
import Header, { HEADER_HEIGHT } from '../../../components/HeaderComponents/Header';
import YearDropdown from '../../../components/HeaderComponents/YearDropdown';
import BackButton, {
  BACK_BUTTON_HEIGHT,
} from '../../../components/HeaderComponents/BackButton';
import theme from '../../../constants/theme';
import {
  HEADER_TITLE_MARGIN_TOP,
  HEADER_TOP_TAB_MARGIN_BOTTOM,
  HEADER_TOP_TAB_MARGIN_TOP,
} from '../../../components/HeaderComponents/constants';
import COLORS from '../../../constants/colors';
import {
  LEADERBOARD_LIST_ITEM_HEIGHT,
  LEADERBOARD_PROFILE_IMAGE_SIZE,
} from '../../../components/LeaderboardListItem/Template';
import { FlashList } from '@shopify/flash-list';
import DualTabsWrapper from '../../../components/DualTabsWrapper';
import { useSharedValue } from 'react-native-reanimated';
import useDevice from '../../../util/device';

const Leaderboard = () => {
  const tabsPosX = useSharedValue(0);
  const flashListRef = useRef<FlashList<any>>(null);

  const { isPad } = useDevice();
  const { disableBack } = useRouteParams();
  const {
    event,
    setEvent,
    setYear,
    phase,
    setPhase,
    leaderboard,
    allEvents: events,
  } = useEventSelect({
    isLeaderboard: true,
  });

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

  const [scrollEnabled, setScrollEnabled] = useState(true);

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

  const longestList = Math.max(
    leaderboardRankings.length,
    followingLeaderboardRankings.length,
  );
  const dataToLoopThrough =
    longestList === leaderboardRankings.length
      ? leaderboardRankings
      : followingLeaderboardRankings;
  const data = dataToLoopThrough.map((_, i) => [
    leaderboardRankings[i],
    followingLeaderboardRankings[i],
  ]);

  const backButtonHeight = disableBack ? 0 : BACK_BUTTON_HEIGHT;

  return (
    <BackgroundWrapper>
      <HeaderDropdownOverlay />
      <DynamicHeaderFlatListWrapper<(iLeaderboardRankingsWithUserData | undefined)[]>
        flashListRef={flashListRef}
        disableBack={disableBack}
        topOnlyContent={{
          height:
            HEADER_HEIGHT +
            HEADER_TITLE_MARGIN_TOP +
            EVENT_TOP_TABS_HEIGHT +
            HEADER_TOP_TAB_MARGIN_BOTTOM * 2 +
            HEADER_TOP_TAB_MARGIN_TOP +
            backButtonHeight,
          component: (
            <View
              style={{
                marginTop: HEADER_TITLE_MARGIN_TOP,
                borderBottomColor: COLORS.primaryLight,
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  paddingLeft: theme.windowMargin,
                  paddingRight: theme.windowMargin,
                }}
              >
                {disableBack ? null : <BackButton variation={'on-dark'} />}
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Header text={'Leaderboards'} />
                  <YearDropdown
                    event={event}
                    eventOptions={eventsWithLeaderboard}
                    setYear={setYear}
                    heightAboveDropdown={HEADER_TITLE_MARGIN_TOP + backButtonHeight}
                  />
                </View>
              </View>
              <View
                style={{
                  marginTop: HEADER_TOP_TAB_MARGIN_TOP,
                  marginBottom: HEADER_TOP_TAB_MARGIN_BOTTOM * 2,
                }}
              >
                {event && phase ? (
                  <LeaderboardTopTabs
                    style={{
                      paddingLeft: theme.windowMargin,
                    }}
                    selectedEvent={event}
                    phase={phase}
                    setLeaderboard={(e, p) => {
                      setPhase(p);
                      setEvent(e, true);
                    }}
                  />
                ) : null}
              </View>
            </View>
          ),
        }}
        titleWhenCollapsed={`${event.year} ${
          AWARDS_BODY_TO_PLURAL_STRING[event.awardsBody]
        }\n${PHASE_TO_STRING_PLURAL[phase]} Leaderboard`}
        flatListProps={{
          data,
          keyExtractor: (item) => {
            return `${item?.[0]?.userId}${item?.[1]?.userId}`;
          },
          renderItem: ({ item }) => {
            return (
              <DualTabsWrapper
                tabs={[
                  item[0] ? <LeaderboardListItem leaderboardRanking={item[0]} /> : <></>,
                  item[1] ? <LeaderboardListItem leaderboardRanking={item[1]} /> : <></>,
                ]}
                tabsPosX={tabsPosX}
              />
            );
          },
          scrollEnabled,
          estimatedItemSize: LEADERBOARD_LIST_ITEM_HEIGHT * (isPad ? 1.5 : 1),
          ListHeaderComponent: (
            <>
              {user?._id && userLeaderboard ? (
                <LeaderboardListItem
                  leaderboardRanking={{ ...userLeaderboard, ...user, userId: user._id }}
                  style={{ backgroundColor: COLORS.primaryLight }}
                />
              ) : null}
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  width: '100%',
                  alignItems: 'center',
                  padding: 15,
                }}
              >
                <SubHeader>Community Scores</SubHeader>
              </View>
              <LeaderboardChart
                leaderboard={leaderboard}
                setScrollEnabled={setScrollEnabled}
              />
              {authUserId ? (
                <SectionTopTabs
                  tabs={[{ title: 'All Users' }, { title: 'Following' }]}
                  tabsPosX={tabsPosX}
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
          onEndReached,
        }}
      />
    </BackgroundWrapper>
  );
};

export default Leaderboard;
