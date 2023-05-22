import { useQuery } from '@tanstack/react-query';
import getUserProfile from '../../services/queryFuncs/getUserProfile';
import { QueryKeys } from '../../types';

// NOTE: we're only using this for the authUser right now
const useQueryGetUserProfile = (
  id: string | undefined,
  authUserId: string | undefined,
) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: [QueryKeys.USER_PROFILE + authUserId],
    queryFn: () => getUserProfile(id, authUserId),
  });

  return { data, isLoading, refetch };
};

export default useQueryGetUserProfile;
