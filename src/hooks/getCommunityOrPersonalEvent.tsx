import { useQuery } from '@tanstack/react-query';
import getCommunityPredictionsByEvent from '../services/queryFuncs/getCommunityPredictionsByEvent';
import getPersonalPredictionsByEvent from '../services/queryFuncs/getPersonalPredictionsByEvent';
import { iEvent, QueryKeys } from '../types';

const useQueryCommunityOrPersonalEvent = (
  tab: 'personal' | 'community',
  event: iEvent,
  userId?: string | undefined,
) => {
  if (tab === 'personal' && userId === undefined) {
    console.error('ERROR: userId cannot be undefined if tab is personal');
  }
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
