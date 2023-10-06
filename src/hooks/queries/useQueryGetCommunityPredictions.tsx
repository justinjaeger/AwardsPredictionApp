import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types/keys';
import MongoApi from '../../services/api/requests';
import { useEvent } from '../../context/EventContext';
import { useTmdbDataStore } from '../../context/TmdbDataStore';
import AsyncStorageCache from '../../services/cache';
import { PredictionSet, WithId } from '../../types/api';

const TTL = (60 * 60 * 24 * 1 * 1000) / 24; // in ms - currently 1 hour

const useQueryGetCommunityPredictions = () => {
  const { storeTmdbDataFromPredictionSet } = useTmdbDataStore();
  const { event } = useEvent();
  const eventId = event?._id;

  const key = QueryKeys.COMMUNITY_PREDICTIONS + eventId;

  const getFromAsyncStorage = async () => {
    return await AsyncStorageCache.getItem<WithId<PredictionSet>>(key);
  };
  const setInAsyncStorage = async (data: WithId<PredictionSet>) => {
    return await AsyncStorageCache.setItem(key, data, TTL);
  };

  /**
   * Note: We can cache this data for an hour because it changes on an hour timer func anyway
   */
  const { data, isLoading, refetch } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      if (!eventId) return undefined;
      // TODO: remove performance monitoring
      const startTime = performance.now();

      let data = await getFromAsyncStorage();
      if (data) {
        storeTmdbDataFromPredictionSet(data);
      } else {
        const { data: predictionSet } = await MongoApi.getPredictionSet({
          userId: 'community',
          eventId,
        });
        data = predictionSet;
      }

      const endTime = performance.now();
      console.log('getPredictionSet took ' + (endTime - startTime) + ' milliseconds.');

      if (data) {
        setInAsyncStorage(data);
        storeTmdbDataFromPredictionSet(data);
      }
      return data;
    },
  });

  return { data, isLoading, refetch };
};

export default useQueryGetCommunityPredictions;
