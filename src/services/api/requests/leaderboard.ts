import { LeaderboardRanking, Phase, User, WithId } from '../../../models';
import api from '../api';

export type iLeaderboardRankingsWithUserData = LeaderboardRanking & Partial<WithId<User>>;

export const getLeaderboardUsers = async ({
  eventId,
  phase,
  pageNum,
  noShorts,
  sortByField,
  sortOrder,
}: {
  eventId: string;
  phase: Phase;
  pageNum: number;
  noShorts?: boolean;
  sortByField?: 'rank' | 'riskiness'; // rank by default in db
  sortOrder?: 'asc' | 'desc'; // asc by default in db
}) => {
  let queryString = '?';
  if (noShorts) {
    if (queryString !== '?') {
      queryString += '&';
    }
    queryString += `noShorts=${noShorts.toString()}`;
  }
  if (sortByField) {
    if (queryString !== '?') {
      queryString += '&';
    }
    queryString += `sortByField=${sortByField}`;
  }
  if (sortOrder) {
    if (queryString !== '?') {
      queryString += '&';
    }
    queryString += `sortOrder=${sortOrder}`;
  }
  return await api.get<{
    leaderboardRankingsWithUserData: iLeaderboardRankingsWithUserData[];
    hasNextPage: boolean;
  }>(
    `leaderboard/${eventId}/${phase}/${pageNum}${queryString === '?' ? '' : queryString}`,
  );
};
