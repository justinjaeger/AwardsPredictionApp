import { useEffect, useState } from 'react';
import { iUser } from '../types';
import { useAuth } from '../context/UserContext';
import getRecommendedUsers from '../services/queryFuncs/getRecommendedUsers';

// pagenatedly fetch recommended users that user isn't currently following
const useRecommendedUsers = () => {
  const { userId: authUserId } = useAuth();

  const [paginateToken, setPaginateToken] = useState<string | undefined>(undefined);
  const [users, setUsers] = useState<iUser[]>([]);

  const fetchPage = async () => {
    const { users, nextToken } = await getRecommendedUsers(authUserId, paginateToken);
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
