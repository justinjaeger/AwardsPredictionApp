import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Snackbar from '../../components/Snackbar';
import ApiServices from '../../services/graphql';
import { QueryKeys } from '../../types';

const useUpdateUser = (onComplete?: () => void) => {
  const queryClient = useQueryClient();

  const [isComplete, setIsComplete] = useState<boolean>(true);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (params: {
      id: string;
      username: string | undefined;
      name: string | undefined;
    }) => {
      setIsComplete(false);
      return ApiServices.updateUsername(params.id, params.username, params.name);
    },
    onSuccess: async (res) => {
      if (res.status === 'error') {
        Snackbar.error(res.message || '');
        setIsComplete(true);
        return;
      }
      // re-fetch predictions so the UI updates
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.USER_PROFILE],
      });
      setIsComplete(true);
      onComplete && onComplete();
    },
  });

  return { mutate, isLoading, isComplete };
};

export default useUpdateUser;
