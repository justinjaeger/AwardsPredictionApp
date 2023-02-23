import { useQuery } from '@tanstack/react-query';
import getFriendsPredictingEvent from '../services/queryFuncs/getFriendsPredictingEvent';
import { QueryKeys } from '../types';

const useFriendsPredictingEvent = (
  followingUserId: string | undefined,
  eventId: string | undefined,
) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: [QueryKeys.FRIENDS_PREDICTING_EVENT],
    queryFn: () => getFriendsPredictingEvent(followingUserId, eventId),
  });

  return { data, isLoading, refetch };
};

export default useFriendsPredictingEvent;
