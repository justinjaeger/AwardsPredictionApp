import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { ContenderVisibility } from '../../API';
import ApiServices from '../../services/graphql';

const useMutationUpdateContenderVisibility = (onComplete?: () => void) => {
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
    onSuccess: () => {
      setIsComplete(true);
      onComplete && onComplete();
    },
  });

  return { mutate, isLoading, isComplete };
};

export default useMutationUpdateContenderVisibility;
