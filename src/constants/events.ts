import { EventStatus } from '../API';

export const EVENT_STATUS_TO_STRING: {
  [key in EventStatus]: string;
} = {
  [EventStatus.NOMS_STAGING]: 'Pending Release', // shouldn't show this to user / start preparing nominations
  [EventStatus.NOMS_LIVE]: 'Predict Nominations', // let users predict nominations
  [EventStatus.WINS_STAGING]: 'Nominations Closed', // start preparing winners
  [EventStatus.WINS_LIVE]: 'Predict Winners', // let users predict winners
  [EventStatus.ARCHIVED]: 'Archived', // view history only
};
