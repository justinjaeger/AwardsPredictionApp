import { useEffect, useState } from 'react';
import { PAGINATED_USER_LIMIT } from '../constants';
import { User, WithId } from '../types/api';
import MongoApi from '../services/api/requests';

const usePaginatedFriends = ({
  userId,
  type,
}: {
  userId: string;
  type: 'followers' | 'following';
}) => {
  const [stopFetching, setStopFetching] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [users, setUsers] = useState<WithId<User>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // we need this to see if WE are following the user:

  const fetchPage = async () => {
    if (stopFetching || isLoading) return;
    if (users.length === 0) setIsLoading(true);
    const Request =
      type === 'followers'
        ? MongoApi.listFollowersPaginated
        : MongoApi.listFollowingPaginated;
    const { data } = await Request({
      userId,
      pageNumber,
    });
    const newUsers = data ?? [];
    setPageNumber((prev) => prev + 1);
    if (newUsers.length < PAGINATED_USER_LIMIT) {
      setStopFetching(true);
    }
    setUsers((prev) => [...prev, ...newUsers]);
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
