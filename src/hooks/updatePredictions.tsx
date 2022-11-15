import { useMutation, useQueryClient } from '@tanstack/react-query';
import ApiServices from '../services/graphql';
import { iPredictionData, iPredictionSetParams } from '../services/graphql/prediction';
import { QueryKeys } from '../store/types';

const useMutationUpdatePredictions = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (params: {
      predictionSetParams: iPredictionSetParams;
      predictionData: iPredictionData;
    }) => {
      return ApiServices.createOrUpdatePredictions(
        params.predictionSetParams,
        params.predictionData,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PERSONAL_EVENT] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.COMMUNITY_EVENT] });
    },
  });

  return { mutate, isLoading };
};

export default useMutationUpdatePredictions;
