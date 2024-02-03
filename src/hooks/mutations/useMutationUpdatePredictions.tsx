import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { QueryKeys } from '../../types/keys';
import { useAuth } from '../../context/AuthContext';
import MongoApi from '../../services/api/requests';
import { iUpdatePredictionSetPayload } from '../../services/api/requests/predictionset';
import { useRouteParams } from '../useRouteParams';

const useMutationUpdatePredictions = (onComplete: () => void, onIsSaving: () => void) => {
  const { userId: authUserId } = useAuth();
  const { event: _event } = useRouteParams();
  const event = _event!;
  const queryClient = useQueryClient();

  const [isComplete, setIsComplete] = useState<boolean>(true);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (payload: iUpdatePredictionSetPayload) => {
      setIsComplete(false);
      onIsSaving();
      return MongoApi.updatePredictionSet(payload);
    },
    onSuccess: async () => {
      const promises = [];
      // re-fetch predictions so the UI updates
      promises.push(
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.USER_PREDICTIONS, authUserId, event!._id],
        }),
      );
      promises.push(
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.USER, authUserId],
        }),
      );
      await Promise.all(promises);
      setIsComplete(true);
      onComplete && onComplete();
    },
  });

  return { mutate, isLoading, isComplete };
};

export default useMutationUpdatePredictions;
