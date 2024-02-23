import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types/keys';
import MongoApi from '../../services/api/requests';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../models';
import { getDefaultEvent } from '../../util/getDefaultEvent';
import { getDefaultLeaderboard } from '../../util/getDefaultLeaderboard';
import { QUERY_OPTIONS } from './constants';
import { getLeaderboardsFromEvents } from '../../util/getLeaderboardsFromEvents';
import { useEffect } from 'react';

const useQueryGetAllEvents = () => {
  const { userRole } = useAuth();
  const conditionThatChangesResult = userRole === UserRole.ADMIN;

  const { isLoading, data, refetch } = useQuery({
    queryKey: [QueryKeys.EVENTS],
    queryFn: async () => {
      const { data: events } = await MongoApi.getEvents({});
      const filteredEvents = (events ?? []).filter((event) => {
        if (event.isHidden) {
          return conditionThatChangesResult;
        }
        return true;
      });
      return filteredEvents;
    },
    ...QUERY_OPTIONS,
  });

  // really this only impacts admin
  useEffect(() => {
    if (conditionThatChangesResult) {
      refetch();
    }
  }, [conditionThatChangesResult]);

  const leaderboards = getLeaderboardsFromEvents(data);

  const defaultEvent = getDefaultEvent(data);
  const defaultLeaderboard = getDefaultLeaderboard(data);

  return {
    data,
    leaderboards,
    isLoading,
    refetch,
    defaultEvent,
    defaultLeaderboard,
  };
};

export default useQueryGetAllEvents;
