import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ContenderVisibility } from '../../API';
import ApiServices from '../../services/graphql';
import { QueryKeys } from '../../types';

const useMutationUpdateContenderVisibility = (onComplete?: () => void) => {
  const queryClient = useQueryClient();

  const [isComplete, setIsComplete] = useState<boolean>(true);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (params: {
      contenderId: string;
      contenderMovieId: string;
      visibility: ContenderVisibility;
    }) => {
      setIsComplete(false);
      return ApiServices.updateContenderVisibilty(
        params.contenderId,
        params.contenderMovieId,
        params.visibility,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.COMMUNITY_EVENT] });
      setIsComplete(true);
      onComplete && onComplete();
    },
  });

  return { mutate, isLoading, isComplete };
};

export default useMutationUpdateContenderVisibility;
