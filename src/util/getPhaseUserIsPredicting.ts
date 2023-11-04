import { EventModel, EventStatus, Phase } from '../types/api';

/**
 * If wins have happened, or it's closed, it should return Phase.CLOSED
 * If a shortlist happened, and you're predicting what the noms will be, it should return Phase.NOMINATION
 * If nominations happened, and you're predicting what wins, it should return Phase.WINNER
 * If nothing has already happened, it should return undefined
 */
export const getPhaseUserIsPredicting = (
  event: EventModel,
  shortlistDateTime: Date | undefined,
) => {
  const { status, nomDateTime, winDateTime } = event;
  const shortlistDateHasPassed = !!(shortlistDateTime && shortlistDateTime < new Date());
  const nomDateHasPassed = !!(nomDateTime && nomDateTime < new Date());
  const winDateHasPassed = !!(winDateTime && winDateTime < new Date());
  const isPredictingForbidden = winDateHasPassed || status === EventStatus.ARCHIVED;
  const isPredictingWinners = nomDateHasPassed && status === EventStatus.WINS_LIVE;
  const isPredictingNominations =
    shortlistDateHasPassed && status === EventStatus.NOMS_LIVE;
  const phaseUserIsPredicting = isPredictingForbidden
    ? Phase.CLOSED
    : isPredictingWinners
    ? Phase.WINNER
    : isPredictingNominations
    ? Phase.NOMINATION
    : undefined;
  return phaseUserIsPredicting;
};
