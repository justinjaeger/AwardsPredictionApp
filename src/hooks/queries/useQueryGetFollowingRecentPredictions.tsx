import { useQuery } from '@tanstack/react-query';
import getFollowingRecentPredictions from '../../services/queryFuncs/getFollowingRecentPredictions';
import { QueryKeys } from '../../types';

const useQueryGetFollowingRecentPredictions = (id: string | undefined) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: [QueryKeys.FOLLOWING_RECENT_PREDICTIONS],
    queryFn: () => getFollowingRecentPredictions(id),
  });

  return { data, isLoading, refetch };
};

export default useQueryGetFollowingRecentPredictions;
