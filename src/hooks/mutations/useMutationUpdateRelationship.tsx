import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { QueryKeys } from '../../types/keys';
import MongoApi from '../../services/api/requests';

const useMutationUpdateRelationship = (onComplete?: () => void) => {
  const queryClient = useQueryClient();

  const [isComplete, setIsComplete] = useState<boolean>(true);

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      action,
      profileUserId,
    }: {
      action: 'follow' | 'unfollow';
      profileUserId: string;
    }) => {
      setIsComplete(false);
      if (action === 'follow') {
        return MongoApi.createRelationship(profileUserId);
      } else if (action === 'unfollow') {
        return MongoApi.deleteRelationship(profileUserId);
      }
    },
    onSuccess: async () => {
      // re-fetch predictions so the UI updates
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.FOLLOWING_USERS_NESTED_FIELDS],
      }); // because this is the query we get other users' carousel predictions from
      setIsComplete(true);
      onComplete && onComplete();
    },
  });

  return { mutate, isLoading, isComplete };
};

export default useMutationUpdateRelationship;
