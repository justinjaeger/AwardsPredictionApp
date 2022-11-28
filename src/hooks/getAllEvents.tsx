import { useQuery } from '@tanstack/react-query';
import getAllEvents from '../services/queryFuncs/getAllEvents';
import { QueryKeys } from '../types';

const useQueryAllEvents = () => {
  const { isLoading, data } = useQuery({
    queryKey: [QueryKeys.EVENTS],
    queryFn: getAllEvents,
  });

  return { data, isLoading };
};

export default useQueryAllEvents;
