import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import ApiServices from '../services/graphql';
import { iPredictionData, iPredictionSetParams } from '../services/graphql/prediction';
import { QueryKeys } from '../store/types';

const useMutationUpdatePredictions = () => {
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
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.COMMUNITY_EVENT] });
      setIsComplete(true);
    },
  });

  return { mutate, isLoading, isComplete };
};

export default useMutationUpdatePredictions;
