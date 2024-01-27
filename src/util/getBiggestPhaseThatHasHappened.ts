import { CategoryName, EventModel, EventStatus, Phase } from '../models';
import { yyyymmddToDate } from './yyyymmddToDate';

export const getBiggestPhaseThatHasHappened = (
  event: EventModel,
  category: CategoryName | undefined,
  yyyymmdd?: number, // if pass this, we'll see if phase has happed BY THIS DATE
) => {
  const { status, nomDateTime, winDateTime, shortlistDateTime } = event;
  const { isShortlisted } = category
    ? event.categories[category]
    : { isShortlisted: false };

  const d = yyyymmdd ? yyyymmddToDate(yyyymmdd) : new Date();
  const shortlistDateHasPassed = shortlistDateTime && new Date(shortlistDateTime) < d;
  const nomDateHasPassed = nomDateTime && new Date(nomDateTime) < d;
  const winDateHasPassed = winDateTime && new Date(winDateTime) < d;

  const isPredictingForbidden = winDateHasPassed || status === EventStatus.ARCHIVED;
  const isPredictingWinners = nomDateHasPassed;
  const isPredictingAfterShortlist = isShortlisted && shortlistDateHasPassed;

  const phaseUserIsPredicting = isPredictingForbidden
    ? Phase.WINNER
    : isPredictingWinners
    ? Phase.NOMINATION
    : isPredictingAfterShortlist
    ? Phase.SHORTLIST
    : undefined;
  return phaseUserIsPredicting;
};

export const getCurrentPhaseBeingPredicted = (event: EventModel) => {
  const biggestPhaseThatHasHappened = getBiggestPhaseThatHasHappened(event, undefined);
  if (
    biggestPhaseThatHasHappened === undefined ||
    biggestPhaseThatHasHappened === Phase.SHORTLIST
  ) {
    return Phase.NOMINATION;
  }
  if (biggestPhaseThatHasHappened === Phase.NOMINATION) {
    return Phase.WINNER;
  }
  if ([Phase.WINNER, Phase.CLOSED].includes(biggestPhaseThatHasHappened)) {
    return Phase.CLOSED;
  }
};
