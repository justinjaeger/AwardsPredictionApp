import React from 'react';
import { View } from 'react-native';
import LastUpdatedText from '../../../components/LastUpdatedText';
import { useAuth } from '../../../context/AuthContext';
import { EventModel, PredictionSet, WithId } from '../../../models';
import { useRouteParams } from '../../../hooks/useRouteParams';
import useProfileUser from '../../Profile/useProfileUser';
import LeaderboardStats from '../../Leaderboard/Leaderboard/LeaderboardStats';
import { getLeaderboardFromEvent } from '../../../util/getLeaderboardFromEvent';
import FollowButton from '../../../components/FollowButton';
import useQueryGetFollowingUsers from '../../../hooks/queries/useQueryGetFollowingUsers';
import theme from '../../../constants/theme';
import { truncateText } from '../../../util/truncateText';
import { getLastUpdatedOnPredictionSet } from '../../../util/getLastUpdatedOnPredictionSet';

const EventListHeaderComponent = ({
  tab,
  predictionData,
  isLoading, // TODO: need this when viewing event with leaderboard
  event,
  yyyymmdd,
}: {
  tab: 'personal' | 'community';
  predictionData: WithId<PredictionSet> | undefined;
  isLoading: boolean;
  event: WithId<EventModel> | undefined;
  yyyymmdd?: number;
}) => {
  const { userId: authUserId } = useAuth();
  const { userInfo, phase, noShorts } = useRouteParams();
  const { user } = useProfileUser(userInfo?.userId || authUserId);
  const isAuthProfile = user?._id === authUserId;

  const { usersIdsAuthUserIsFollowing } = useQueryGetFollowingUsers();

  const leaderboard = event && phase && getLeaderboardFromEvent(event, phase, noShorts);

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

  return (
    <View style={{ width: '100%' }}>
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
      ) : (
        <LastUpdatedText lastUpdated={lastUpdatedString} />
      )}
    </View>
  );
};

export default EventListHeaderComponent;
