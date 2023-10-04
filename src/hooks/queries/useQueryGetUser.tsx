import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types/keys';
import MongoApi from '../../services/api/requests';
import { useTmdbDataStore } from '../../context/TmdbDataStore';

const useQueryGetUser = (userId: string | undefined) => {
  const { storeTmdbDataFromRecentPredictions } = useTmdbDataStore();

  const { isLoading, data, refetch } = useQuery({
    queryKey: [QueryKeys.USER + (userId || '')],
    queryFn: async () => {
      if (!userId) return undefined;
      const { data: user } = await MongoApi.getUser({ userId });
      // set movies in cache
      storeTmdbDataFromRecentPredictions(user?.recentPredictionSets || []);
      return user;
    },
  });

  return { data, isLoading, refetch };
};

export default useQueryGetUser;
