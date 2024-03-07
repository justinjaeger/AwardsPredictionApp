import { SORTED_AWARDS_BODIES } from '../constants/awardsBodies';
import { EventModel, WithId } from '../models';

/**
 * Sorts events by year and awards body
 */
export const getSortedEvents = (events: WithId<EventModel>[]): WithId<EventModel>[] =>
  events.sort(({ awardsBody: ab1, year: y1 }, { awardsBody: ab2, year: y2 }) => {
    if (y1 !== y2) {
      return y2 - y1;
    }
    const indexA = SORTED_AWARDS_BODIES.indexOf(ab1);
    const indexB = SORTED_AWARDS_BODIES.indexOf(ab2);
    return indexA - indexB;
  });
