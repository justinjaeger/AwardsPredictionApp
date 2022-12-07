import { useQuery } from '@tanstack/react-query';
import getUser from '../services/queryFuncs/getUser';
import { QueryKeys } from '../types';

const useQueryGetUser = (id: string | undefined) => {
  const { isLoading, data } = useQuery({
    queryKey: [QueryKeys.USER],
    queryFn: () => getUser(id),
  });

  return { data, isLoading };
};

export default useQueryGetUser;
