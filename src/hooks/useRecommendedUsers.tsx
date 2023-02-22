import { useEffect, useState } from 'react';
import { iUser } from '../types';
import { useAuth } from '../context/UserContext';
import getRecommendedUsers from '../services/queryFuncs/getRecommendedUsers';
import { PAGINATED_USER_LIMIT } from '../constants';

// pagenatedly fetch recommended users that user isn't currently following
const useRecommendedUsers = () => {
  const { userId: authUserId } = useAuth();

  const [stopFetching, setStopFetching] = useState<boolean>(false);
  const [paginateToken, setPaginateToken] = useState<string | undefined>(undefined);
  const [users, setUsers] = useState<iUser[]>([]);

  const fetchPage = async () => {
    if (stopFetching) return;
    const { users, nextToken } = await getRecommendedUsers(authUserId, paginateToken);
    // token comes back as undefined when there are NO MORE results, so we don't want to make any more requests
    if (users.length < PAGINATED_USER_LIMIT || nextToken === undefined) {
      setStopFetching(true);
    }
    setUsers((prev) => [...prev, ...users]);
    setPaginateToken(nextToken);
  };

  useEffect(() => {
    // fetch page when land on screen
    fetchPage();
  }, []);

  // export fetchPage to allow user to fetch next page
  return { users, fetchPage };
};

export default useRecommendedUsers;
