import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import ApiServices from '../../services/graphql';
import { iPredictionData, iPredictionSetParams } from '../../services/graphql/prediction';
import { QueryKeys } from '../../types';

const useMutationUpdatePredictions = (
  onComplete?: () => void,
  isAuthUserProfile?: boolean,
) => {
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
      // re-fetch predictions so the UI updates
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.PERSONAL_EVENT] });
      if (isAuthUserProfile) {
        await queryClient.invalidateQueries({ queryKey: [QueryKeys.USER_PROFILE] });
      }
      setIsComplete(true);
      onComplete && onComplete();
    },
  });

  return { mutate, isLoading, isComplete };
};

export default useMutationUpdatePredictions;
