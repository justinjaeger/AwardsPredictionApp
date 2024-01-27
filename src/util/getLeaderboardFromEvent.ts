import { EventModel, Phase } from '../models';

export const getLeaderboardFromEvent = (
  event: EventModel,
  phase: Phase,
  noShorts?: boolean,
) => {
  const leaderboard =
    event?.leaderboards &&
    Object.values(event.leaderboards).find(
      (l) => l.phase === phase && !!l.noShorts === !!noShorts,
    );
  return leaderboard;
};
