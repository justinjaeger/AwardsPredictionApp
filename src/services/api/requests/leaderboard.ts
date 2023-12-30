import { Phase, User, WithId } from '../../../types/api';
import api from '../api';

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
  return await api.get<{ users: WithId<User>[]; hasNextPage: boolean }>(
    `leaderboard/${eventId}/${phase}/${pageNum}${queryString === '?' ? '' : queryString}`,
  );
};

export const getLeaderboardUsersFromFollowing = async ({
  userId,
  eventId,
  phase,
  pageNum,
  noShorts,
  sortByField,
  sortOrder,
}: {
  userId: string;
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
  return await api.get<{ users: WithId<User>[]; hasNextPage: boolean }>(
    `leaderboard/following/${userId}/${eventId}/${phase}/${pageNum}${
      queryString === '?' ? '' : queryString
    }`,
  );
};
