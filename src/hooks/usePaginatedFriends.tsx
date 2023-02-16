import { useEffect, useState } from 'react';
import {
  getPaginatedFollowers,
  getPaginatedFollowing,
} from '../services/queryFuncs/getPaginatedRelationships';
import { iUser } from '../types';
import { useAuth } from '../context/UserContext';

const usePaginatedFriends = ({
  userId,
  type,
}: {
  userId: string;
  type: 'followers' | 'following';
}) => {
  const { userId: authUserId } = useAuth();

  const [paginateToken, setPaginateToken] = useState<string | undefined>(undefined);
  const [users, setUsers] = useState<iUser[]>([]);

  const fetchPage = async () => {
    const Request = type === 'followers' ? getPaginatedFollowers : getPaginatedFollowing;
    const { users, nextToken } = await Request(userId, authUserId, paginateToken);
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

export default usePaginatedFriends;
