import { useQuery } from '@tanstack/react-query';
import getPersonalPredictionsByEvent from '../../services/queryFuncs/getPersonalPredictionsByEvent';
import { QueryKeys } from '../../types';

const useQueryPersonalEvent = (eventId: string, userId: string) => {
  const { isLoading, data } = useQuery({
    queryKey: [QueryKeys.PERSONAL_EVENT],
    queryFn: () => getPersonalPredictionsByEvent(eventId, userId),
  });

  return { data, isLoading };
};

export default useQueryPersonalEvent;
