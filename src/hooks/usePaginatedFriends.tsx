import { useEffect, useState } from 'react';
import {
  getPaginatedFollowers,
  getPaginatedFollowing,
} from '../services/queryFuncs/getPaginatedRelationships';
import { iUser } from '../types';
import { useAuth } from '../context/UserContext';
import getAuthFollowingUserIds from '../services/queryFuncs/getAuthFollowingUserIds';
import { PAGINATED_USER_LIMIT } from '../constants';

const usePaginatedFriends = ({
  userId,
  type,
}: {
  userId: string;
  type: 'followers' | 'following';
}) => {
  const { userId: authUserId } = useAuth();

  const [stopFetching, setStopFetching] = useState<boolean>(false);
  const [paginateToken, setPaginateToken] = useState<string | undefined>(undefined);
  const [users, setUsers] = useState<iUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authFollowingUserIds, setAuthFollowingUserIds] = useState<string[]>([]);

  const fetchPage = async () => {
    if (stopFetching || isLoading) return;
    if (users.length === 0) setIsLoading(true);
    // doing it this way lets us only fetch this once rather than on every paginated request
    let followingUserIds = authFollowingUserIds;
    if (authFollowingUserIds.length === 0) {
      followingUserIds = await getAuthFollowingUserIds(authUserId);
      setAuthFollowingUserIds(followingUserIds);
    }
    const Request = type === 'followers' ? getPaginatedFollowers : getPaginatedFollowing;
    const { users: friends, nextToken } = await Request({
      userId,
      authFollowingUserIds: followingUserIds,
      limit: PAGINATED_USER_LIMIT,
      nextToken: paginateToken,
    });
    // token comes back as undefined when there are NO MORE results, so we don't want to make any more requests
    if (friends.length < PAGINATED_USER_LIMIT || nextToken === undefined) {
      setStopFetching(true);
    }
    setUsers((prev) => [...prev, ...friends]);
    setPaginateToken(nextToken);
    setIsLoading(false);
  };

  useEffect(() => {
    // fetch page when land on screen
    fetchPage();
  }, []);

  // export fetchPage to allow user to fetch next page
  return { users, fetchPage, isLoading, hasFetchedAll: stopFetching };
};

export default usePaginatedFriends;
