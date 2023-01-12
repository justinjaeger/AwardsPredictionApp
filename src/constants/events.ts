import { ContenderAccolade, EventStatus, PredictionType } from '../API';
import { iEvent } from '../types';
import { formatDateTime } from '../util/formatDateTime';

export const EVENT_STATUS_TO_STRING: {
  [key in EventStatus]: string;
} = {
  [EventStatus.NOMS_STAGING]: 'Pending Release', // shouldn't show this to user / start preparing nominations
  [EventStatus.NOMS_LIVE]: 'Predict Nominations', // let users predict nominations
  [EventStatus.WINS_STAGING]: 'Nominations Closed', // start preparing winners
  [EventStatus.WINS_LIVE]: 'Predict Winners', // let users predict winners
  [EventStatus.ARCHIVED]: 'Archived', // view history only
};

export const ACCOLADE_TO_STRING: {
  [key in ContenderAccolade]: string;
} = {
  [ContenderAccolade.SHORTLISTED]: 'Shortlisted',
  [ContenderAccolade.NOMINEE]: 'Nominated',
  [ContenderAccolade.WINNER]: 'Winner',
};

/**
 * PredictionType = NOMINATION if event is in NOMS_LIVE or NOMS_STAGING
 * else, we're predicting for the win, so PredictionType = WIN
 */
export const eventStatusToPredictionType = (eventStatus: EventStatus): PredictionType =>
  [EventStatus.NOMS_LIVE, EventStatus.NOMS_STAGING].includes(eventStatus)
    ? PredictionType.NOMINATION
    : PredictionType.WIN;

export const getEventTime = (event: iEvent) => {
  const nomDateTime = new Date(event?.nominationDateTime || '');
  const winDateTime = new Date(event?.winDateTime || '');

  return EventStatus.ARCHIVED === event.status
    ? ''
    : eventStatusToPredictionType(event.status) === PredictionType.NOMINATION
    ? event.nominationDateTime
      ? formatDateTime(nomDateTime)
      : ''
    : event.winDateTime
    ? formatDateTime(winDateTime)
    : '';
};
