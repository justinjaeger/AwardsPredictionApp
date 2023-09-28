import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types';
import MongoApi from '../../services/api/requests';

const useQueryGetUserProfile = (authUserId: string | undefined) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: [QueryKeys.USER_PROFILE + authUserId],
    queryFn: async () => {
      const { data: user } = await MongoApi.getUser({ userId: authUserId });
      return user;
    },
  });

  return { data, isLoading, refetch };
};

export default useQueryGetUserProfile;
