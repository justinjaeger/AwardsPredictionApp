import { EventModel, WithId, iLeaderboard } from '../models';

export const getDefaultLeaderboard = (events: WithId<EventModel>[] | undefined) => {
  let mostRecentLeaderboard: iLeaderboard | undefined;
  events?.forEach((e) => {
    // get the most recent leaderboard that has happened
    const mostRecentEventLeaderboard = e.leaderboards
      ? Object.values(e.leaderboards ?? {}).reduce((acc, curr) => {
          if (curr.createdAt > acc.createdAt) return curr;
          return acc;
        })
      : undefined;

    if (
      mostRecentEventLeaderboard &&
      (!mostRecentLeaderboard ||
        mostRecentEventLeaderboard.createdAt > mostRecentLeaderboard.createdAt)
    ) {
      mostRecentLeaderboard = mostRecentEventLeaderboard;
    }
  });

  return mostRecentLeaderboard;
};
