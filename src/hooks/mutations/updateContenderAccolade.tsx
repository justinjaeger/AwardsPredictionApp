import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ContenderAccolade } from '../../API';
import ApiServices from '../../services/graphql';
import { QueryKeys } from '../../types';

const useMutationUpdateContenderAccolade = (onComplete?: () => void) => {
  const queryClient = useQueryClient();

  const [isComplete, setIsComplete] = useState<boolean>(true);

  const { mutate: updateContenderAccolade, isLoading } = useMutation({
    mutationFn: async (params: {
      contenderId: string;
      accolade: ContenderAccolade | undefined;
    }) => {
      setIsComplete(false);
      return ApiServices.updateContenderAccolade(
        params.contenderId,
        params.accolade || null,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.COMMUNITY_EVENT] });
      setIsComplete(true);
      onComplete && onComplete();
    },
  });

  return { updateContenderAccolade, isLoading, isComplete };
};

export default useMutationUpdateContenderAccolade;
