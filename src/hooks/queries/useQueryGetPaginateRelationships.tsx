import { useQuery } from '@tanstack/react-query';
import {
  getPaginatedFollowers,
  getPaginatedFollowing,
} from '../../services/queryFuncs/getPaginatedRelationships';
import { QueryKeys } from '../../types';

export const useQueryGetPaginatedFollowers = (userId: string) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: [QueryKeys.PAGINATED_FOLLOWERS],
    queryFn: () => getPaginatedFollowers(userId),
  });

  return { data, isLoading, refetch };
};

export const useQueryGetPaginatedFollowing = (userId: string) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: [QueryKeys.PAGINATED_FOLLOWING],
    queryFn: () => getPaginatedFollowing(userId),
  });

  return { data, isLoading, refetch };
};
