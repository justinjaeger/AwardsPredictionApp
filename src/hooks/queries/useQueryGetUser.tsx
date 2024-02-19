import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types/keys';
import MongoApi from '../../services/api/requests';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import { QUERY_OPTIONS } from './constants';

const useQueryGetUser = (userId: string | undefined) => {
  const { storeTmdbDataFromRecentPredictions } = useTmdbDataStore();

  const { isLoading, data, refetch } = useQuery({
    queryKey: [QueryKeys.USER, userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data: user } = await MongoApi.getUser({ userId });
      // set movies in cache
      storeTmdbDataFromRecentPredictions(user?.recentPredictionSets || []);
      return user ?? null;
    },
    ...QUERY_OPTIONS,
  });

  return { data, isLoading, refetch };
};

export default useQueryGetUser;
