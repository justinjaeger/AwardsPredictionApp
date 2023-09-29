import { EventModel, EventStatus, Phase } from '../types/api';

export const getPhaseUserIsPredicting = (
  event: EventModel,
  shortlistDateTime: Date | undefined,
) => {
  const { status, nomDateTime, winDateTime } = event;
  const shortlistDateHasPassed = !!(shortlistDateTime && shortlistDateTime < new Date());
  const nomDateHasPassed = !!(nomDateTime && nomDateTime < new Date());
  const winDateHasPassed = !!(winDateTime && winDateTime < new Date());
  const canPredictWinners = !winDateHasPassed && status === EventStatus.WINS_LIVE;
  const canPredictNominations = !nomDateHasPassed && status === EventStatus.NOMS_LIVE;
  const canPredictShortlist = !shortlistDateHasPassed && status === EventStatus.NOMS_LIVE;
  const phaseUserIsPredicting = canPredictWinners
    ? Phase.WINNER
    : canPredictShortlist
    ? Phase.SHORTLIST
    : canPredictNominations
    ? Phase.NOMINATION
    : Phase.CLOSED;
  return phaseUserIsPredicting;
};
