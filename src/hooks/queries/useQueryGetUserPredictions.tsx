import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types/keys';
import MongoApi from '../../services/api/requests';
import { useEvent } from '../../context/EventContext';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import { PredictionSet, WithId } from '../../types/api';

const useQueryGetUserPredictions = (userId?: string) => {
  const { storeTmdbDataFromPredictionSet } = useTmdbDataStore();
  const { event } = useEvent();
  const eventId = event?._id;

  const { data, isLoading, refetch } = useQuery({
    queryKey: [QueryKeys.USER_PREDICTIONS + userId + eventId],
    queryFn: async (): Promise<WithId<PredictionSet> | null> => {
      if (!userId || !eventId) return null;
      const { data: predictionSet } = await MongoApi.getPredictionSet({
        userId,
        eventId,
      });
      if (predictionSet) {
        // set movies in cache
        storeTmdbDataFromPredictionSet(predictionSet, event.year);
      }
      return predictionSet ?? null;
    },
  });

  return { data, isLoading, refetch };
};

export default useQueryGetUserPredictions;
