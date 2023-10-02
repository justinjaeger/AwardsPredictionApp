import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types/keys';
import MongoApi from '../../services/api/requests';
import { useEvent } from '../../context/EventContext';
import { useTmdbDataStore } from '../../context/TmdbDataStore';

const useQueryGetUserPredictions = (userId?: string) => {
  const { storeTmdbDataFromPredictionSet } = useTmdbDataStore();
  const { event: _event } = useEvent();
  const eventId = _event!._id;

  const { data, isLoading, refetch } = useQuery({
    queryKey: [QueryKeys.USER_PREDICTIONS + userId + eventId],
    queryFn: async () => {
      if (!userId) return undefined;
      const { data: predictionSet } = await MongoApi.getPredictionSet({
        userId,
        eventId,
      });
      if (predictionSet) {
        // set movies in cache
        storeTmdbDataFromPredictionSet(predictionSet);
      }
      return predictionSet;
    },
  });

  return { data, isLoading, refetch };
};

export default useQueryGetUserPredictions;
