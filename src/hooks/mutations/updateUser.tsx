import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Snackbar from '../../components/Snackbar';
import ApiServices from '../../services/graphql';
import { QueryKeys } from '../../types';
import { useAuth } from '../../context/UserContext';

const useUpdateUser = (onComplete?: () => void) => {
  const queryClient = useQueryClient();
  const { userId: authUserId } = useAuth();

  const [isComplete, setIsComplete] = useState<boolean>(true);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (params: {
      id: string;
      username: string | undefined;
      name: string | undefined;
      bio: string | undefined;
    }) => {
      setIsComplete(false);
      return ApiServices.updateUsername(
        params.id,
        params.username,
        params.name,
        params.bio,
      );
    },
    onSuccess: async (res) => {
      if (res.status === 'error') {
        Snackbar.error(res.message || '');
        setIsComplete(true);
        return;
      }
      // re-fetch predictions so the UI updates
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.USER_PROFILE + authUserId],
      });
      setIsComplete(true);
      onComplete && onComplete();
    },
  });

  return { mutate, isLoading, isComplete };
};

export default useUpdateUser;
