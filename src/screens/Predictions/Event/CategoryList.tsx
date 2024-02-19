import React, { useCallback } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { PredictionsNavigationProp } from '../../../navigation/types';
import { usePersonalCommunityTab } from '../../../context/EventContext';
import SignedOutState from '../../../components/SignedOutState';
import LastUpdatedText, {
  LAST_UPDATED_SECTION_HEIGHT,
} from '../../../components/LastUpdatedText';
import { useAuth } from '../../../context/AuthContext';
import { StackActions, useNavigation } from '@react-navigation/native';
import {
  CategoryName,
  EventModel,
  PredictionSet,
  WithId,
  iCategoryPrediction,
} from '../../../models';
import EventSkeleton from '../../../components/Skeletons/EventSkeleton';
import { getOrderedCategories } from '../../../util/sortByObjectOrder';
import CategoryListItem from './CategoryListItem';
import { useRouteParams } from '../../../hooks/useRouteParams';
import useProfileUser from '../../Profile/useProfileUser';
import LeaderboardStats from '../../Leaderboard/Leaderboard/LeaderboardStats';
import { getLeaderboardFromEvent } from '../../../util/getLeaderboardFromEvent';
import FollowButton from '../../../components/FollowButton';
import useQueryGetFollowingUsers from '../../../hooks/queries/useQueryGetFollowingUsers';
import theme from '../../../constants/theme';
import { truncateText } from '../../../util/truncateText';
import { getLastUpdatedOnPredictionSet } from '../../../util/getLastUpdatedOnPredictionSet';
import { getUserInfo } from '../../../util/getUserInfo';
import { UNEXPLAINED_EXTRA_SCROLL_HEIGHT } from './constants';
import { getCategoryListItemHeight } from '../../../util/getCategoryListItemHeight';

const CategoryList = ({
  tab,
  predictionData,
  isLoading,
  event,
  yyyymmdd,
}: {
  tab: 'personal' | 'community';
  predictionData: WithId<PredictionSet> | undefined;
  isLoading: boolean;
  event: WithId<EventModel> | undefined;
  yyyymmdd?: number;
}) => {
  const { width } = useWindowDimensions();
  const { userId: authUserId } = useAuth();
  const { userInfo, phase, noShorts, isLeaderboard } = useRouteParams();
  const { user } = useProfileUser(userInfo?.userId || authUserId);
  const { setPersonalCommunityTab } = usePersonalCommunityTab();
  const navigation = useNavigation<PredictionsNavigationProp>();
  const { usersIdsAuthUserIsFollowing } = useQueryGetFollowingUsers();

  const leaderboard = event && phase && getLeaderboardFromEvent(event, phase, noShorts);

  // TODO: userInfo doesn't contain the auth user. So just assume it's the auth user
  const isAuthProfile = user?._id === authUserId;

  const onSelectCategory = async (category: CategoryName) => {
    if (!event) return;
    setPersonalCommunityTab(tab);
    const params = {
      userInfo: userInfo || getUserInfo(user),
      eventId: event._id,
      category,
      phase,
      yyyymmdd,
      noShorts,
      isLeaderboard,
    };
    if (isAuthProfile || tab === 'community') {
      navigation.navigate('Category', params);
    } else {
      navigation.dispatch(StackActions.push('Category', params));
    }
  };

  const onPress = useCallback(async (category: CategoryName) => {
    onSelectCategory(category);
  }, []);

  if (!user?._id && tab === 'personal') {
    return <SignedOutState />;
  }

  if (isLoading ?? !predictionData) {
    return <EventSkeleton />;
  }

  const unorderedCategories = (predictionData?.categories || {}) as Record<
    CategoryName,
    iCategoryPrediction
  >;
  const orderedPredictions = event
    ? getOrderedCategories(event, unorderedCategories)
    : [];

  const leaderboardRankings =
    Object.values(user?.leaderboardRankings?.[event?._id ?? ''] ?? {}) ?? [];

  const userLeaderboard = leaderboardRankings.find(
    (l) =>
      l.eventId === event?._id && l.yyyymmdd === yyyymmdd && l.noShorts === !!noShorts,
  );

  const displayLbStats = yyyymmdd && userLeaderboard;
  const authUserIsFollowing = user && usersIdsAuthUserIsFollowing.includes(user._id);
  const displayFollowButton = user && !isAuthProfile && !authUserIsFollowing;

  const lastUpdatedString = getLastUpdatedOnPredictionSet(
    predictionData,
    tab === 'community',
  );
  const showLastUpdated = !displayLbStats && lastUpdatedString;

  const bodyHeight = orderedPredictions.reduce(
    (acc, [categoryName, categoryPrediction]) => {
      if (!event) return acc;
      const listItemHeight = getCategoryListItemHeight({
        categoryName,
        numUserPredictionsInCategory: categoryPrediction?.predictions?.length ?? 0,
        event,
        windowWidth: width,
      });
      return acc + listItemHeight;
    },
    UNEXPLAINED_EXTRA_SCROLL_HEIGHT + (showLastUpdated ? LAST_UPDATED_SECTION_HEIGHT : 0),
  );

  // TODO: ALSO ADD THE HEIGHT OF THE LEADERBOARD SECTION

  return (
    <View
      style={{
        width: '100%',
        // TODO: just added as a test to see if this is correct
        height: bodyHeight,
      }}
    >
      {displayLbStats ? (
        <>
          {tab === 'community' ? (
            leaderboard ? (
              <LeaderboardStats
                percentageAccuracy={leaderboard.communityPercentageAccuracy}
                numCorrect={leaderboard.communityNumCorrect}
                totalPossibleSlots={leaderboard.totalPossibleSlots}
                numUsersPredicting={leaderboard.numUsersPredicting}
                rank={
                  leaderboard.numUsersPredicting -
                  leaderboard.communityPerformedBetterThanNumUsers
                }
                riskiness={leaderboard.communityRiskiness}
              />
            ) : null
          ) : (
            <>
              <LeaderboardStats
                percentageAccuracy={userLeaderboard.percentageAccuracy}
                numCorrect={userLeaderboard.numCorrect}
                totalPossibleSlots={userLeaderboard.totalPossibleSlots}
                numUsersPredicting={userLeaderboard.numUsersPredicting}
                rank={userLeaderboard.rank}
                riskiness={userLeaderboard.riskiness}
                lastUpdated={userLeaderboard.lastUpdated}
                slotsPredicted={userLeaderboard.slotsPredicted}
              />
              {displayFollowButton ? (
                <View
                  style={{
                    justifyContent: 'flex-end',
                    width: '100%',
                    flexDirection: 'row',
                    marginTop: 10,
                    paddingRight: theme.windowMargin,
                    paddingLeft: theme.windowMargin,
                  }}
                >
                  <View
                    style={{
                      alignSelf: 'flex-end',
                    }}
                  >
                    <FollowButton
                      authUserIsFollowing={usersIdsAuthUserIsFollowing.includes(user._id)}
                      profileUserId={user._id}
                      textWhenNotFollowing={`Follow ${truncateText(
                        user?.name ?? user.username ?? '',
                        15,
                      )}`}
                    />
                  </View>
                </View>
              ) : null}
            </>
          )}
          <View style={{ marginBottom: displayFollowButton ? 10 : 20 }} />
        </>
      ) : null}
      {showLastUpdated ? <LastUpdatedText lastUpdated={lastUpdatedString} /> : null}
      {event
        ? orderedPredictions.map((category) => {
            return (
              <CategoryListItem
                key={category[0]}
                item={category}
                onPress={onPress}
                event={event}
              />
            );
          })
        : null}
    </View>
  );
};

export default CategoryList;
