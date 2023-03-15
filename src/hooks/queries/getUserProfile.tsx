import { useQuery } from '@tanstack/react-query';
import getUserProfile from '../../services/queryFuncs/getUserProfile';
import { QueryKeys } from '../../types';

const useQueryGetUserProfile = (
  id: string | undefined,
  authUserId: string | undefined,
) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: [QueryKeys.USER_PROFILE],
    queryFn: () => (id !== authUserId ? {} : getUserProfile(id, authUserId)),
  });

  return { data, isLoading, refetch };
};

export default useQueryGetUserProfile;
