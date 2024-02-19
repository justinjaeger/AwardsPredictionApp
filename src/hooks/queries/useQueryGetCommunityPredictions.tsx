import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types/keys';
import MongoApi from '../../services/api/requests';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import { EventModel, WithId } from '../../models';
import { useRouteParams } from '../useRouteParams';
import { QUERY_OPTIONS } from './constants';

const useQueryGetCommunityPredictions = (params?: {
  event?: WithId<EventModel>;
  yyyymmdd?: number;
}) => {
  const { event: propsEvent, yyyymmdd } = params ?? {};
  const { storeTmdbDataFromPredictionSet } = useTmdbDataStore();
  const { event: contextEvent } = useRouteParams();
  const event = propsEvent ?? contextEvent;
  const eventId = event?._id;

  /**
   * Note: We can cache this data for an hour because it changes on an hour timer func anyway
   */
  const { data, isLoading, refetch } = useQuery({
    queryKey: [QueryKeys.COMMUNITY_PREDICTIONS, eventId, yyyymmdd],
    queryFn: async () => {
      if (!eventId) return null;
      // TODO: remove performance monitoring
      const startTime = performance.now();

      const { data: predictionSet } = await MongoApi.getPredictionSet({
        userId: 'community',
        eventId,
        yyyymmdd,
      });

      const endTime = performance.now();
      console.log('getPredictionSet took ' + (endTime - startTime) + ' milliseconds.');

      if (predictionSet) {
        storeTmdbDataFromPredictionSet(predictionSet, event.year);
      }
      return predictionSet ?? null;
    },
    ...QUERY_OPTIONS,
  });

  return { data, isLoading, refetch };
};

export default useQueryGetCommunityPredictions;
