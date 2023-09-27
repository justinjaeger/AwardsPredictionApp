import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types';
import MongoApi from '../../services/api/requests';
import { User, WithId, iRecentPrediction } from '../../types/api';
import { useAsyncStorePrefetch } from '../../context/AsyncStorePrefetch';

/**
 * returns list of users who current user is following
 * with all their predictions
 * MAYBE we can do this paginatedly... but we have to sort by the createdAt, so probably not
 */
// useQueryGetFollowingUsersWithRecentPredictions
const useQueryGetFollowingRecentPredictions = (authUser: WithId<User>) => {
  const { storeTmdbDataFromRecentPredictions } = useAsyncStorePrefetch();

  const { isLoading, data, refetch } = useQuery({
    queryKey: [QueryKeys.FOLLOWING_RECENT_PREDICTIONS],
    queryFn: async () => {
      if (!authUser) return [];
      // Get all following users and their predictions
      const { data: users } = await MongoApi.listFollowingWithRecentPredictions(
        authUser._id,
      );
      if (!users) return [];
      const usersSortedByMostRecentPrediction = users.sort((u1, u2) => {
        const uiPDate = u1.recentPredictionSets?.[0]?.createdAt;
        const u2PDate = u2.recentPredictionSets?.[0]?.createdAt;
        if (!uiPDate || !u2PDate) return 0; // if either user has no predictions, don't sort them (yet
        if (uiPDate > u2PDate) return -1;
        if (uiPDate < u2PDate) return 1;
        return 0;
      });

      // store prediction data in cache
      const allRecentPredictions: iRecentPrediction[] = [];
      usersSortedByMostRecentPrediction
        .flatMap((u) => u.recentPredictionSets)
        .forEach((p) => {
          if (p) allRecentPredictions.push(p);
        });
      await storeTmdbDataFromRecentPredictions(allRecentPredictions);

      return usersSortedByMostRecentPrediction;
    },
  });

  return { data, isLoading, refetch };
};

export default useQueryGetFollowingRecentPredictions;
