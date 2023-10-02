import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Snackbar from '../../components/Snackbar';
import { QueryKeys } from '../../types/keys';
import { useAuth } from '../../context/AuthContext';
import MongoApi from '../../services/api/requests';

const useMutationUpdateUser = (onComplete?: () => void) => {
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
      return MongoApi.updateUser(params);
    },
    onSuccess: async (res) => {
      if (res.status === 'error') {
        Snackbar.error(res.message || '');
        setIsComplete(true);
        return;
      }
      // re-fetch predictions so the UI updates
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.USER + authUserId],
      });
      setIsComplete(true);
      onComplete && onComplete();
    },
  });

  return { mutate, isLoading, isComplete };
};

export default useMutationUpdateUser;
