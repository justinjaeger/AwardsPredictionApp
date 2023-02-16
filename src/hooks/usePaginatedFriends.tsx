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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPage = async () => {
    if (users.length === 0) setIsLoading(true);
    const Request = type === 'followers' ? getPaginatedFollowers : getPaginatedFollowing;
    const { users: friends, nextToken } = await Request(
      userId,
      authUserId,
      paginateToken,
    );
    setUsers((prev) => [...prev, ...friends]);
    setPaginateToken(nextToken);
    setIsLoading(false);
  };

  useEffect(() => {
    // fetch page when land on screen
    fetchPage();
  }, []);

  // export fetchPage to allow user to fetch next page
  return { users, fetchPage, isLoading };
};

export default usePaginatedFriends;
