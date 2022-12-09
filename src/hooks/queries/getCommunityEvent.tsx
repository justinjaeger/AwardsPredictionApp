import { useQuery } from '@tanstack/react-query';
import getCommunityPredictionsByEvent from '../../services/queryFuncs/getCommunityPredictionsByEvent';
import { iEvent, QueryKeys } from '../../types';

const useQueryCommunityEvent = (event: iEvent) => {
  const { isLoading, data } = useQuery({
    queryKey: [QueryKeys.COMMUNITY_EVENT],
    queryFn: () => getCommunityPredictionsByEvent(event),
  });

  return { data, isLoading };
};

export default useQueryCommunityEvent;
