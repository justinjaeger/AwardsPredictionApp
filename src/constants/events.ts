import { EventModel, Phase } from '../models';
import { formatDateTimeShort } from '../util/formatDateTime';
import { getCurrentPhaseBeingPredicted } from '../util/getBiggestPhaseThatHasHappened';

export const ACCOLADE_TO_STRING: {
  [key in Phase]: string;
} = {
  [Phase.SHORTLIST]: 'Shortlisted',
  [Phase.NOMINATION]: 'Nominated',
  [Phase.WINNER]: 'Winner',
  [Phase.CLOSED]: '',
};

export const PHASE_TO_CTA: {
  [key in Phase]: string;
} = {
  [Phase.SHORTLIST]: 'Predict Nominations',
  [Phase.NOMINATION]: 'Predict Nominations',
  [Phase.WINNER]: 'Predict Winners',
  [Phase.CLOSED]: 'View History',
};

export const ACCOLADE_TO_SHORTSTRING: {
  [key in Phase]: string;
} = {
  [Phase.SHORTLIST]: 'SHL',
  [Phase.NOMINATION]: 'NOM',
  [Phase.WINNER]: 'WIN',
  [Phase.CLOSED]: '',
};

export const ACCOLADE_TO_LETTER: {
  [key in Phase]: string;
} = {
  [Phase.SHORTLIST]: 'S',
  [Phase.NOMINATION]: 'N',
  [Phase.WINNER]: 'W',
  [Phase.CLOSED]: '',
};

/**
 * Shows the time the event closes
 */
export const getEventTime = (event: EventModel) => {
  const longAgo = new Date(0);
  const nomDateTime = event.nomDateTime ? new Date(event.nomDateTime) : longAgo;
  const winDateTime = event.winDateTime ? new Date(event.winDateTime) : longAgo;

  const phase = getCurrentPhaseBeingPredicted(event);

  const now = new Date();
  // set showTimeNom to true if is within one week of event
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  const showTimeNom = now.getTime() - nomDateTime.getTime() < oneWeek;
  const showTimeWin = now.getTime() - winDateTime.getTime() < oneWeek;

  return event.nomDateTime && phase === Phase.NOMINATION
    ? formatDateTimeShort(nomDateTime, showTimeNom)
    : event.winDateTime && phase === Phase.WINNER
    ? formatDateTimeShort(winDateTime, showTimeWin)
    : undefined;
};
