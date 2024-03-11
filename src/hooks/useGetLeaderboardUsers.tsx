import { useEffect, useState } from 'react';
import { Phase } from '../models';
import MongoApi from '../services/api/requests';
import { iLeaderboardRankingsWithUserData } from '../services/api/requests/leaderboard';

// TODO: could make this more efficient by more re-fetching requests (caching locally)
// since right now, switching between tabs causes a refetch
// We can actually do paginated requests via react query so that would be the best way to refactor this
const useGetLeaderboardUsers = ({
  eventId,
  phase,
  noShorts,
  sortByField,
  sortOrder,
}: {
  eventId: string | undefined;
  phase: Phase | undefined;
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

  /**
   * This is being called in overlapping requests
   */
  const fetchPage = async (reset?: boolean) => {
    if (!hasNextPage || isLoading || !eventId || !phase) return;
    setIsLoading(true);
    if (reset) {
      setPageNumber(1);
      const { data } = await MongoApi.getLeaderboardUsers({
        eventId,
        phase,
        pageNum: 1,
        noShorts,
        sortByField,
        sortOrder,
      });
      const newRankings = data?.leaderboardRankingsWithUserData ?? [];
      setHasNextPage(data?.hasNextPage || false);
      setLeaderboardRankings(newRankings);
    } else {
      setPageNumber((prev) => prev + 1);
      const { data } = await MongoApi.getLeaderboardUsers({
        eventId,
        phase,
        pageNum: pageNumber + 1,
        noShorts,
        sortByField,
        sortOrder,
      });
      const newRankings = data?.leaderboardRankingsWithUserData ?? [];
      setHasNextPage(data?.hasNextPage || false);
      setLeaderboardRankings((prev) => [...prev, ...newRankings]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // fetch page when land on screen
    if (eventId && phase) {
      fetchPage(true);
    }
  }, [eventId, phase]);

  // export fetchPage to allow user to fetch next page
  return { leaderboardRankings, fetchPage, isLoading, hasNextPage };
};

export default useGetLeaderboardUsers;
