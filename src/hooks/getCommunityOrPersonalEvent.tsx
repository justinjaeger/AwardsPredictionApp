import { useQuery } from '@tanstack/react-query';
import getCommunityPredictionsByEvent from '../services/queryFuncs/getCommunityPredictionsByEvent';
import getPersonalPredictionsByEvent from '../services/queryFuncs/getPersonalPredictionsByEvent';
import { iEvent, QueryKeys } from '../store/types';

const useQueryCommunityOrPersonalEvent = (
  tab: 'personal' | 'community',
  event: iEvent,
  userId?: string | undefined,
) => {
  const { data, isLoading } = useQuery({
    queryKey: [
      tab === 'community' ? QueryKeys.COMMUNITY_EVENT : QueryKeys.PERSONAL_EVENT,
    ],
    queryFn:
      tab === 'community'
        ? () => getCommunityPredictionsByEvent(event)
        : () => getPersonalPredictionsByEvent(event.id, userId || ''),
  });

  return { data, isLoading };
};

export default useQueryCommunityOrPersonalEvent;
