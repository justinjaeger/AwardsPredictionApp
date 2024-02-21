import { EventModel, Phase, WithId, iLeaderboard } from '../models';

// Note: fitlers out shortlist leaderboards
export const getLeaderboardsFromEvents = (events: WithId<EventModel>[] | undefined) => {
  if (!events) return [];

  const leaderboards = events.reduce((acc: iLeaderboard[], event) => {
    // get the most recent leaderboard that has happened
    if (event.leaderboards) {
      Object.entries(event.leaderboards).forEach(([, leaderboard]) => {
        if (leaderboard.phase !== Phase.SHORTLIST) {
          acc.push(leaderboard);
        }
      });
    }
    return acc;
  }, []);

  return leaderboards;
};
