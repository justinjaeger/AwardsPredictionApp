import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types/keys';
import MongoApi from '../../services/api/requests';

const useQueryGetAllEvents = () => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: [QueryKeys.EVENTS],
    queryFn: async () => {
      const { data: events } = await MongoApi.getEvents({});
      return events ?? null;
    },
  });

  return { data, isLoading, refetch };
};

export default useQueryGetAllEvents;
