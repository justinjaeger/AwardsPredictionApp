import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types/keys';
import MongoApi from '../../services/api/requests';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../models';
import { getDefaultEvent } from '../../util/getDefaultEvent';
import { getDefaultLeaderboard } from '../../util/getDefaultLeaderboard';
import { getLeaderboardsFromEvents } from '../../util/getLeaderboardsFromEvents';

const useQueryGetAllEvents = () => {
  const { userRole } = useAuth();
  const isAdmin = userRole === UserRole.ADMIN;

  const { isLoading, data } = useQuery({
    queryKey: [QueryKeys.EVENTS, isAdmin],
    queryFn: async () => {
      const { data: events } = await MongoApi.getEvents({});
      const filteredEvents = (events ?? []).filter((event) => {
        if (event.isHidden) {
          return isAdmin;
        }
        return true;
      });
      return filteredEvents;
    },
  });

  const leaderboards = getLeaderboardsFromEvents(data);

  const defaultEvent = getDefaultEvent(data);
  const defaultLeaderboard = getDefaultLeaderboard(data);

  return {
    data,
    leaderboards,
    isLoading,
    defaultEvent,
    defaultLeaderboard,
  };
};

export default useQueryGetAllEvents;
