import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import ApiServices from '../../services/graphql';
import { QueryKeys } from '../../types';

const useUpdateRelationship = (onComplete?: () => void) => {
  const queryClient = useQueryClient();

  const [isComplete, setIsComplete] = useState<boolean>(true);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (params: {
      action: 'follow' | 'unfollow';
      profileUserId: string;
      authUserId: string;
    }) => {
      const { action, profileUserId, authUserId } = params;
      setIsComplete(false);
      if (action === 'follow') {
        await ApiServices.followUser(profileUserId, authUserId);
      }
      if (action === 'unfollow') {
        await ApiServices.unFollowUser(profileUserId, authUserId);
      }
    },
    onSuccess: async () => {
      // re-fetch predictions so the UI updates
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.USER, QueryKeys.USER_PROFILE],
      });
      setIsComplete(true);
      onComplete && onComplete();
    },
  });

  return { mutate, isLoading, isComplete };
};

export default useUpdateRelationship;
