import { useEffect, useState } from 'react';
import { Phase, User, WithId } from '../types/api';
import MongoApi from '../services/api/requests';

const useGetLeaderboardUsersFromFollowing = ({
  userId,
  eventId,
  phase,
  noShorts,
  sortByField,
  sortOrder,
}: {
  userId: string;
  eventId: string;
  phase: Phase;
  noShorts?: boolean;
  sortByField?: 'rank' | 'riskiness'; // rank by default in db
  sortOrder?: 'asc' | 'desc'; // asc by default in db
}) => {
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [users, setUsers] = useState<WithId<User>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPage = async () => {
    if (hasNextPage || isLoading) return;
    if (users.length === 0) setIsLoading(true);
    const { data } = await MongoApi.getLeaderboardUsersFromFollowing({
      userId,
      eventId,
      phase,
      pageNum: pageNumber,
      noShorts,
      sortByField,
      sortOrder,
    });
    const newUsers = data?.users ?? [];
    setPageNumber((prev) => prev + 1);
    setHasNextPage(data?.hasNextPage ?? false);
    setUsers((prev) => [...prev, ...newUsers]);
    setIsLoading(false);
  };

  useEffect(() => {
    // fetch page when land on screen
    fetchPage();
  }, []);

  // export fetchPage to allow user to fetch next page
  return { users, fetchPage, isLoading, hasNextPage };
};

export default useGetLeaderboardUsersFromFollowing;
