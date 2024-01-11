import { Phase, User } from '../types/api';

export const getUserLeaderboard = ({
  user,
  eventId,
  phase,
  noShorts,
}: {
  user: User;
  eventId: string;
  phase: Phase;
  noShorts?: boolean;
}) => {
  return Object.values(user.leaderboardRankings?.[eventId] ?? {}).find(
    (leaderboardRanking) => {
      return (
        leaderboardRanking.phase === phase && !!leaderboardRanking.noShorts === !!noShorts
      );
    },
  );
};
