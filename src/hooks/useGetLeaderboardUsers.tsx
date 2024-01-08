import { useEffect, useState } from 'react';
import { Phase } from '../types/api';
import MongoApi from '../services/api/requests';
import { iLeaderboardRankingsWithUserData } from '../services/api/requests/leaderboard';

const useGetLeaderboardUsers = ({
  eventId,
  phase,
  noShorts,
  sortByField,
  sortOrder,
}: {
  eventId: string;
  phase: Phase;
  noShorts?: boolean;
  sortByField?: 'rank' | 'riskiness'; // rank by default in db
  sortOrder?: 'asc' | 'desc'; // asc by default in db
}) => {
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [leaderboardRankings, setLeaderboardRankings] = useState<
    iLeaderboardRankingsWithUserData[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPage = async () => {
    if (!hasNextPage || isLoading) return;
    if (leaderboardRankings.length === 0) setIsLoading(true);
    const { data } = await MongoApi.getLeaderboardUsers({
      eventId,
      phase,
      pageNum: pageNumber,
      noShorts,
      sortByField,
      sortOrder,
    });
    const newRankings = data?.leaderboardRankingsWithUserData ?? [];
    setPageNumber((prev) => prev + 1);
    setHasNextPage(data?.hasNextPage ?? false);
    setLeaderboardRankings((prev) => [...prev, ...newRankings]);
    setIsLoading(false);
  };

  useEffect(() => {
    // fetch page when land on screen
    fetchPage();
  }, []);

  // export fetchPage to allow user to fetch next page
  return { leaderboardRankings, fetchPage, isLoading, hasNextPage };
};

export default useGetLeaderboardUsers;
