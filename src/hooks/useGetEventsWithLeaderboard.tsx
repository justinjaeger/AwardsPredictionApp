import useQueryGetAllEvents from './queries/useQueryGetAllEvents';

export const useGetEventsWithLeaderboard = () => {
  const { data: events } = useQueryGetAllEvents();

  if (!events) return [];

  const eventsWithLeaderboards = events?.filter(
    (event) => event.leaderboards && Object.keys(event.leaderboards).length > 0,
  );

  return eventsWithLeaderboards;
};
