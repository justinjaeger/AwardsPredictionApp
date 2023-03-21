import { useState } from 'react';
import { iUser } from '../types';
import { useAuth } from '../context/UserContext';
import getRecommendedUsers from '../services/queryFuncs/getRecommendedUsers';
import { PAGINATED_USER_LIMIT } from '../constants';
import { useNavigateAwayEffect } from '../util/hooks';

// pagenatedly fetch recommended users that user isn't currently following
const useRecommendedUsers = () => {
  const { userId: authUserId } = useAuth();

  const [stopFetching, setStopFetching] = useState<boolean>(false);
  const [paginateToken, setPaginateToken] = useState<string | undefined>(undefined);
  const [users, setUsers] = useState<iUser[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchPage = async (newStopFetching: boolean) => {
    if (newStopFetching) return;
    setIsFetching(true);
    const { users, nextToken } = await getRecommendedUsers(authUserId, paginateToken);
    setIsFetching(false);
    // token comes back as undefined when there are NO MORE results, so we don't want to make any more requests
    if (users.length < PAGINATED_USER_LIMIT || nextToken === undefined) {
      setStopFetching(true);
    }
    setUsers((prev) => [...prev, ...users]);
    setPaginateToken(nextToken);
  };

  // fetches when you navigate away, so when you come back it's fresh
  useNavigateAwayEffect(() => {
    // delay until after transition
    setTimeout(() => {
      const newStopFetching = false;
      setPaginateToken(undefined);
      setStopFetching(newStopFetching);
      setUsers([]);
      fetchPage(newStopFetching);
    }, 500);
  }, []);

  // Note: Not using this at the moment, but it's here if we want to add a "load more" button
  const fetchMoreResults = () => {
    fetchPage(stopFetching);
  };

  // export fetchPage to allow user to fetch next page
  return { users, isFetching, fetchMoreResults };
};

export default useRecommendedUsers;
