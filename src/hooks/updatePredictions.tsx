import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import ApiServices from '../services/graphql';
import { iPredictionData, iPredictionSetParams } from '../services/graphql/prediction';
import { QueryKeys } from '../types';

const useMutationUpdatePredictions = (onComplete?: () => void) => {
  const queryClient = useQueryClient();

  const [isComplete, setIsComplete] = useState<boolean>(true);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (params: {
      predictionSetParams: iPredictionSetParams;
      predictionData: iPredictionData;
    }) => {
      setIsComplete(false);
      return ApiServices.createOrUpdatePredictions(
        params.predictionSetParams,
        params.predictionData,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.PERSONAL_EVENT] });
      // NOT doing the below makes it faster but the community predictions will take a little bit to sync
      // await queryClient.invalidateQueries({ queryKey: [QueryKeys.COMMUNITY_EVENT] });
      setIsComplete(true);
      onComplete && onComplete();
    },
  });

  return { mutate, isLoading, isComplete };
};

export default useMutationUpdatePredictions;
