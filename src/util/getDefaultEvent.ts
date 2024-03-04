import { AwardsBody, EventModel, WithId } from '../models';

/**
 * Gets the default event that is displayed to the user when they open their predictions page
 *
 * TODO:
 * Display when an event is happening in the header, but we'll get to that later
 * (and that's only on the auth user's prediction screen)
 * It should be really good for notifying you of what events are about to happen. But maybe that's MVP.
 *
 * Note: not accounting for shortlists here
 */
export const getDefaultEvent = (events: WithId<EventModel>[] | undefined) => {
  if (!events || events.length === 0) return undefined;

  // find whichever event has the closest deadline AND whose deadline is within a month
  const now = new Date();
  let eventThatHasClosestDeadline: WithId<EventModel> | undefined;
  let closestOverallDateTime: Date = new Date(0);
  events.forEach((event) => {
    const nomDateTime = event.nomDateTime && new Date(event.nomDateTime);
    const winDateTime = event.winDateTime && new Date(event.winDateTime);

    const nomsAreInNearFuture =
      nomDateTime &&
      nomDateTime > now &&
      // true if happening less than 30 days from now
      now < new Date(nomDateTime.getTime() + 30 * 24 * 60 * 60 * 1000);
    const winsAreInNearFuture =
      winDateTime &&
      winDateTime > now &&
      now < new Date(winDateTime.getTime() + 30 * 24 * 60 * 60 * 1000);

    const nearestDateTime = nomsAreInNearFuture
      ? nomDateTime
      : winsAreInNearFuture
      ? winDateTime
      : undefined;

    if (!nearestDateTime) return;

    const thisDateTimeIsCloserThanPrev = nearestDateTime < closestOverallDateTime;
    if (!eventThatHasClosestDeadline || thisDateTimeIsCloserThanPrev) {
      eventThatHasClosestDeadline = event;
      closestOverallDateTime = nearestDateTime;
    }
  });

  if (eventThatHasClosestDeadline) return eventThatHasClosestDeadline;

  // if there are no events with close deadlines, then just default to the academy awards
  let mostRecentAcademyAwardEvent: WithId<EventModel> | undefined;
  events?.forEach((e) => {
    const { awardsBody, year } = e;
    if (
      awardsBody === AwardsBody.ACADEMY_AWARDS &&
      (!mostRecentAcademyAwardEvent || mostRecentAcademyAwardEvent.year < year)
    ) {
      mostRecentAcademyAwardEvent = e;
    }
  });
  if (mostRecentAcademyAwardEvent) return mostRecentAcademyAwardEvent;

  // and if not that, the first event in the list
  return events[0];
};
