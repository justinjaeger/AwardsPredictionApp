import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types/keys';
import MongoApi from '../../services/api/requests';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import { EventModel, PredictionSet, WithId } from '../../models';

const useQueryGetUserPredictions = ({
  event,
  userId,
  yyyymmdd,
}: {
  event: WithId<EventModel> | undefined;
  userId?: string;
  yyyymmdd?: number;
}) => {
  const { storeTmdbDataFromPredictionSet } = useTmdbDataStore();
  // const { event } = useRouteParams();
  // const { _id: eventId, year } = event;
  const eventId = event?._id;

  const { data, isLoading, refetch } = useQuery({
    queryKey: [QueryKeys.USER_PREDICTIONS, userId, eventId, yyyymmdd],
    queryFn: async (): Promise<WithId<PredictionSet> | null> => {
      if (!userId || !event) return null;
      const { data: predictionSet } = await MongoApi.getPredictionSet({
        userId,
        eventId: event._id,
        yyyymmdd,
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
