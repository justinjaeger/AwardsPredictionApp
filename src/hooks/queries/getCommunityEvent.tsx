import { useQuery } from '@tanstack/react-query';
import getCommunityPredictionsByEvent from '../../services/queryFuncs/getCommunityPredictionsByEvent';
import { iEvent, QueryKeys } from '../../types';

const useQueryCommunityEvent = (props: { event: iEvent; includeHidden?: boolean }) => {
  const { event, includeHidden } = props;
  const { isLoading, data } = useQuery({
    queryKey: [QueryKeys.COMMUNITY_EVENT],
    queryFn: () => getCommunityPredictionsByEvent(event, includeHidden),
  });

  return { data, isLoading };
};

export default useQueryCommunityEvent;
