import { useQuery } from '@tanstack/react-query';
import getUserWithRelationships from '../../services/queryFuncs/getUserWithRelationships';
import { QueryKeys } from '../../types';

const useQueryGetUserWithRelationships = (id: string | undefined) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: [QueryKeys.USER_WITH_RELATIONSHIPS],
    queryFn: () => getUserWithRelationships(id),
  });

  return { data, isLoading, refetch };
};

export default useQueryGetUserWithRelationships;
