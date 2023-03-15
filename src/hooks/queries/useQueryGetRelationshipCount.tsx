import { useQuery } from '@tanstack/react-query';
import getNumberRelationships from '../../services/queryFuncs/getRelationshipCount';
import { QueryKeys } from '../../types';

const useQueryGetRelationshipCount = (userId: string | undefined) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: [QueryKeys.RELATIONSHIP_COUNT],
    queryFn: () => getNumberRelationships(userId),
  });

  return { data, isLoading, refetch };
};

export default useQueryGetRelationshipCount;
