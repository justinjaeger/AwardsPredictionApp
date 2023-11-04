import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types/keys';
import MongoApi from '../../services/api/requests';
import { useEvent } from '../../context/EventContext';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import { EventModel, WithId } from '../../types/api';

const useQueryGetCommunityPredictions = (propsEvent?: WithId<EventModel>) => {
  const { storeTmdbDataFromPredictionSet } = useTmdbDataStore();
  const { event: contextEvent } = useEvent();
  const event = propsEvent ?? contextEvent;
  const eventId = event?._id;

  const key = QueryKeys.COMMUNITY_PREDICTIONS + eventId;

  /**
   * Note: We can cache this data for an hour because it changes on an hour timer func anyway
   */
  const { data, isLoading, refetch } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      if (!eventId) return null;
      // TODO: remove performance monitoring
      const startTime = performance.now();

      const { data: predictionSet } = await MongoApi.getPredictionSet({
        userId: 'community',
        eventId,
      });

      const endTime = performance.now();
      console.log('getPredictionSet took ' + (endTime - startTime) + ' milliseconds.');

      if (predictionSet) {
        storeTmdbDataFromPredictionSet(predictionSet, event.year);
      }
      return predictionSet ?? null;
    },
  });

  return { data, isLoading, refetch };
};

export default useQueryGetCommunityPredictions;
