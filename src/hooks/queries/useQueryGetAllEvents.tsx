import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../types/keys';
import MongoApi from '../../services/api/requests';
import { useAuth } from '../../context/AuthContext';
import { AwardsBody, EventModel, UserRole, WithId, iLeaderboard } from '../../models';

const useQueryGetAllEvents = () => {
  const { userRole } = useAuth();
  const { isLoading, data, refetch } = useQuery({
    queryKey: [QueryKeys.EVENTS],
    queryFn: async () => {
      const { data: events } = await MongoApi.getEvents({});
      const filteredEvents = (events ?? []).filter((event) => {
        if (event.isHidden) {
          return userRole === UserRole.ADMIN;
        }
        return true;
      });
      return filteredEvents;
    },
  });

  let mostRecentAcademyAwardEvent: WithId<EventModel> | undefined;
  // date way in the past:
  let mostRecentLeaderboard: iLeaderboard | undefined; // how get this? compare to today: what's the most recent leaderboard that has happened
  data?.forEach((e) => {
    const { awardsBody, year } = e;
    if (
      awardsBody === AwardsBody.ACADEMY_AWARDS &&
      (!mostRecentAcademyAwardEvent ||
        (mostRecentAcademyAwardEvent && mostRecentAcademyAwardEvent.year < year))
    ) {
      mostRecentAcademyAwardEvent = e;
    }

    // get the most recent leaderboard that has happened
    const mostRecentEventLeaderboard = Object.values(e.leaderboards ?? {}).reduce(
      (acc, curr) => {
        if (curr.createdAt > acc.createdAt) return curr;
        return acc;
      },
    );
    if (
      !mostRecentLeaderboard ||
      mostRecentEventLeaderboard.createdAt > mostRecentLeaderboard.createdAt
    ) {
      mostRecentLeaderboard = mostRecentEventLeaderboard;
    }
  });

  return {
    data,
    isLoading,
    refetch,
    defaultEvent: mostRecentAcademyAwardEvent,
    defaultLeaderboard: mostRecentLeaderboard,
  };
};

export default useQueryGetAllEvents;
