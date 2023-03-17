import { useQuery } from '@tanstack/react-query';
import getCommunityPredictionsByEvent from '../../services/queryFuncs/getCommunityPredictionsByEvent';
import getPersonalPredictionsByEvent from '../../services/queryFuncs/getPersonalPredictionsByEvent';
import { iEvent, QueryKeys } from '../../types';

const useQueryCommunityOrPersonalEvent = (
  tab: 'personal' | 'community',
  fetchPersonalEnabled: boolean,
  params: { event: iEvent; userId?: string | undefined; includeHidden?: boolean },
) => {
  const { event, userId, includeHidden } = params;
  if (tab === 'personal' && userId === undefined) {
    console.log('No userId passed');
  }
  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      tab === 'community' ? QueryKeys.COMMUNITY_EVENT : QueryKeys.PERSONAL_EVENT,
    ],
    queryFn:
      tab === 'community'
        ? () => getCommunityPredictionsByEvent(event.id, includeHidden)
        : () => getPersonalPredictionsByEvent(event.id, userId),
    enabled: tab === 'personal' ? fetchPersonalEnabled : true,
  });

  return { data, isLoading, refetch };
};

export default useQueryCommunityOrPersonalEvent;
