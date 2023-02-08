import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import ApiServices from '../../services/graphql';
import { QueryKeys } from '../../types';

const useUpdateProfileImage = (onComplete?: () => void) => {
  const queryClient = useQueryClient();

  const [isComplete, setIsComplete] = useState<boolean>(true);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (params: { id: string; image: string }) => {
      setIsComplete(false);
      return ApiServices.updateProfileImage(params.id, params.image);
    },
    onSuccess: async () => {
      // re-fetch predictions so the UI updates
      await queryClient.invalidateQueries({
        queryKey: [
          QueryKeys.USER,
          QueryKeys.USER_WITH_PREDICTIONS,
          QueryKeys.USER_WITH_RELATIONSHIPS,
        ],
      });
      setIsComplete(true);
      onComplete && onComplete();
    },
  });

  return { mutate, isLoading, isComplete };
};

export default useUpdateProfileImage;
