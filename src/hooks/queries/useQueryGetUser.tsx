import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types/keys';
import MongoApi from '../../services/api/requests';
import { useTmdbDataStore } from '../../context/TmdbDataStore';

const useQueryGetUser = (userId: string | undefined, userIsUndefined?: boolean) => {
  const { storeTmdbDataFromRecentPredictions } = useTmdbDataStore();

  const { isLoading, data } = useQuery({
    queryKey: [QueryKeys.USER, userId, userIsUndefined],
    queryFn: async () => {
      if (!userId) return null;
      const { data: user } = await MongoApi.getUser({ userId });
      // set movies in cache
      storeTmdbDataFromRecentPredictions(user?.recentPredictionSets || []);
      return user ?? null;
    },
  });

  return { data, isLoading };
};

export default useQueryGetUser;
