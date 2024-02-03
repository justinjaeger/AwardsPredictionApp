import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types/keys';
import MongoApi from '../../services/api/requests';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import { PredictionSet, WithId } from '../../models';
import { useRouteParams } from '../useRouteParams';

const useQueryGetUserPredictions = ({
  userId,
  yyyymmdd,
}: {
  userId?: string;
  yyyymmdd?: number;
}) => {
  const { storeTmdbDataFromPredictionSet } = useTmdbDataStore();
  const { event } = useRouteParams();
  const { _id: eventId, year } = event!;

  const { data, isLoading, refetch } = useQuery({
    queryKey: [QueryKeys.USER_PREDICTIONS, userId, eventId, yyyymmdd],
    queryFn: async (): Promise<WithId<PredictionSet> | null> => {
      if (!userId || !eventId) return null;
      const { data: predictionSet } = await MongoApi.getPredictionSet({
        userId,
        eventId,
        yyyymmdd,
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
