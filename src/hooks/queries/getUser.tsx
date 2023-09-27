import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types';
import MongoApi from '../../services/api/requests';

const useQueryGetUser = (userId: string | undefined) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: [QueryKeys.USER + userId],
    queryFn: async () => {
      if (!userId) return undefined;
      const { data: user } = await MongoApi.getUser({ userId });
      return user;
    },
  });

  return { data, isLoading, refetch };
};

export default useQueryGetUser;
