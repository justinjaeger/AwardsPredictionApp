import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types/keys';
import MongoApi from '../../services/api/requests';
import { QUERY_OPTIONS } from './constants';

const useQueryGetEventAccolades = (eventId: string | undefined) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: [QueryKeys.EVENT_ACCOLADES, eventId],
    queryFn: async () => {
      if (!eventId) return {};
      const eventAccolades = await MongoApi.getEventAccolades({ eventId });
      return eventAccolades;
    },
    ...QUERY_OPTIONS,
  });

  return { data, isLoading, refetch };
};

export default useQueryGetEventAccolades;
