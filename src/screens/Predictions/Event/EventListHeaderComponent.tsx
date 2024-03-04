import React from 'react';
import { View } from 'react-native';
import LastUpdatedText from '../../../components/LastUpdatedText';
import { useAuth } from '../../../context/AuthContext';
import { EventModel, PredictionSet, WithId } from '../../../models';
import { useRouteParams } from '../../../hooks/useRouteParams';
import useProfileUser from '../../Profile/useProfileUser';
import LeaderboardStats from '../../Leaderboard/Leaderboard/LeaderboardStats';
import { getLeaderboardFromEvent } from '../../../util/getLeaderboardFromEvent';
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

  const leaderboard = event && phase && getLeaderboardFromEvent(event, phase, noShorts);

  const leaderboardRankings =
    Object.values(user?.leaderboardRankings?.[event?._id ?? ''] ?? {}) ?? [];

  const userLeaderboard = leaderboardRankings.find(
    (l) =>
      l.eventId === event?._id && l.yyyymmdd === yyyymmdd && l.noShorts === !!noShorts,
  );

  const displayLbStats = yyyymmdd && userLeaderboard;

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
          )}
          <View style={{ marginBottom: 10 }} />
        </>
      ) : (
        <LastUpdatedText lastUpdated={lastUpdatedString} />
      )}
    </View>
  );
};

export default EventListHeaderComponent;
