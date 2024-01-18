import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types/keys';
import MongoApi from '../../services/api/requests';

const useQueryGetEventAccolades = (eventId: string | undefined) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: [QueryKeys.EVENT_ACCOLADES, eventId],
    queryFn: async () => {
      if (!eventId) return null;
      const eventAccolades = await MongoApi.getEventAccolades({ eventId });
      return eventAccolades;
    },
  });

  return { data, isLoading, refetch };
};

export default useQueryGetEventAccolades;
