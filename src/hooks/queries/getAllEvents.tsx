import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types';
import MongoApi from '../../services/api/requests';

const useQueryAllEvents = () => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: [QueryKeys.EVENTS],
    queryFn: async () => {
      const { data: events } = await MongoApi.getEvents({});
      return events;
    },
  });

  return { data, isLoading, refetch };
};

export default useQueryAllEvents;
