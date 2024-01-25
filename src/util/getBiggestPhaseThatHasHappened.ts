import { CategoryName, EventModel, EventStatus, Phase } from '../types/api';

export const getBiggestPhaseThatHasHappened = (
  event: EventModel,
  category: CategoryName | undefined,
) => {
  const { status, nomDateTime, winDateTime, shortlistDateTime } = event;
  const { isShortlisted } = category
    ? event.categories[category]
    : { isShortlisted: false };

  const shortlistDateHasPassed =
    shortlistDateTime && new Date(shortlistDateTime) < new Date();
  const nomDateHasPassed = nomDateTime && new Date(nomDateTime) < new Date();
  const winDateHasPassed = winDateTime && new Date(winDateTime) < new Date();

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
