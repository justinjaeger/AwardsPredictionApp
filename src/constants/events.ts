import { EventModel, EventStatus, Phase } from '../models';
import { formatDateTime } from '../util/formatDateTime';
import { getCurrentPhaseBeingPredicted } from '../util/getBiggestPhaseThatHasHappened';

export const EVENT_STATUS_TO_STRING: {
  [key in EventStatus]: string;
} = {
  [EventStatus.NOMS_STAGING]: 'Pending Release', // shouldn't show this to user / start preparing nominations
  [EventStatus.NOMS_LIVE]: 'Predict Nominations', // let users predict nominations
  [EventStatus.WINS_STAGING]: 'Nominations Closed', // start preparing winners
  [EventStatus.WINS_LIVE]: 'Predict Winners', // let users predict winners
  [EventStatus.ARCHIVED]: 'View Results', // view history only
};

export const EVENT_STATUS_TO_STRING_SHORT: {
  [key in EventStatus]: string;
} = {
  [EventStatus.NOMS_STAGING]: 'Pending Release', // shouldn't show this to user / start preparing nominations
  [EventStatus.NOMS_LIVE]: 'Nominations', // let users predict nominations
  [EventStatus.WINS_STAGING]: 'Nominations Closed', // start preparing winners
  [EventStatus.WINS_LIVE]: 'Winners', // let users predict winners
  [EventStatus.ARCHIVED]: 'Complete', // view history only
};

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
 * PredictionType = NOMINATION if event is in NOMS_LIVE or NOMS_STAGING
 * else, we're predicting for the win, so PredictionType = WIN
 */
export const eventStatusToPredictionType = (eventStatus: EventStatus): Phase =>
  [EventStatus.NOMS_LIVE, EventStatus.NOMS_STAGING].includes(eventStatus)
    ? Phase.NOMINATION
    : Phase.WINNER;

/**
 * Shows the time the event closes
 */
export const getEventTime = (event: EventModel) => {
  const longAgo = new Date('1970-01-01');
  const nomDateTime = event.nomDateTime ? new Date(event.nomDateTime) : longAgo;
  const winDateTime = event.winDateTime ? new Date(event.winDateTime) : longAgo;

  const phase = getCurrentPhaseBeingPredicted(event);

  const now = new Date();
  // set showTimeNom to true if is within one week of event
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  const showTimeNom = now.getTime() - nomDateTime.getTime() < oneWeek;
  const showTimeWin = now.getTime() - winDateTime.getTime() < oneWeek;

  return EventStatus.ARCHIVED === event.status
    ? ''
    : event.nomDateTime && phase === Phase.NOMINATION
    ? formatDateTime(nomDateTime, showTimeNom)
    : event.winDateTime && phase === Phase.WINNER
    ? formatDateTime(winDateTime, showTimeWin)
    : '';
};
