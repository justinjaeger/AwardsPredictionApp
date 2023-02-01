import { useQuery } from '@tanstack/react-query';
import getUserWithRecentPredictions from '../../services/queryFuncs/getUserWithRecentPredictions';
import { QueryKeys } from '../../types';

const useQueryGetUserWithRecentPredictions = (id: string | undefined) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: [QueryKeys.USER_WITH_PREDICTIONS],
    queryFn: () => getUserWithRecentPredictions(id),
  });

  return { data, isLoading, refetch };
};

export default useQueryGetUserWithRecentPredictions;
