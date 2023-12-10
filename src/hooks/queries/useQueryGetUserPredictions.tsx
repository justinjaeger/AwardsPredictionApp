import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types/keys';
import MongoApi from '../../services/api/requests';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import { PredictionSet, WithId } from '../../types/api';
import { useRouteParams } from '../useRouteParams';

const useQueryGetUserPredictions = (userId?: string) => {
  const { storeTmdbDataFromPredictionSet } = useTmdbDataStore();
  const { event } = useRouteParams();
  const { _id: eventId, year } = event!;

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
        storeTmdbDataFromPredictionSet(predictionSet, year);
      }
      return predictionSet ?? null;
    },
  });

  return { data, isLoading, refetch };
};

export default useQueryGetUserPredictions;
