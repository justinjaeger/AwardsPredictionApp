import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types/keys';
import MongoApi from '../../services/api/requests';
import { iRecentPrediction } from '../../types/api';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import { useAuth } from '../../context/AuthContext';

/**
 * returns list of users who current user is following with nested fields
 * MAYBE we can do this paginatedly... but we have to sort by the createdAt, so probably not
 */
const useQueryGetFollowingUsers = () => {
  const { userId: authUserId } = useAuth();
  const { storeTmdbDataFromRecentPredictions } = useTmdbDataStore();

  const { isFetching, data, refetch } = useQuery({
    queryKey: [QueryKeys.FOLLOWING_USERS_NESTED_FIELDS],
    queryFn: async () => {
      if (!authUserId) return [];
      // Get all following users and their predictions
      const { data: users } = await MongoApi.listFollowingWithNestedFields(authUserId);
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

  return {
    data,
    isLoading: isFetching,
    refetch,
    usersIdsAuthUserIsFollowing: data?.map((u) => u._id) ?? [],
  };
};

export default useQueryGetFollowingUsers;
