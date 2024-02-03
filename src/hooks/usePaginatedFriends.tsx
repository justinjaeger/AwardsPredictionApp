import { useEffect, useState } from 'react';
import { User, WithId } from '../models';
import MongoApi from '../services/api/requests';
import { PAGINATED_LIMIT } from '../services/api/requests/user';

const usePaginatedFriends = ({
  userId,
  type,
}: {
  userId: string;
  type: 'followers' | 'following';
}) => {
  const [allUsersAreFetched, setAllUsersAreFetched] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [users, setUsers] = useState<WithId<User>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // we need this to see if WE are following the user:

  const fetchPage = async () => {
    if (allUsersAreFetched || isLoading) return;
    setIsLoading(true);
    setPageNumber((prev) => prev + 1);
    const Request =
      type === 'followers'
        ? MongoApi.listFollowersPaginated
        : MongoApi.listFollowingPaginated;
    const { data } = await Request({
      userId,
      pageNumber,
    });
    const newUsers = data ?? [];
    if (newUsers.length < PAGINATED_LIMIT) {
      setAllUsersAreFetched(true);
    }
    setUsers((prev) => [...prev, ...newUsers]);
    setIsLoading(false);
  };

  useEffect(() => {
    // fetch page when land on screen
    fetchPage();
  }, []);

  // export fetchPage to allow user to fetch next page
  return { users, fetchPage, isLoading, allUsersAreFetched };
};

export default usePaginatedFriends;
