import { EventStatus } from '../API';

export const EVENT_STATUS_TO_STRING: {
  [key in EventStatus]: string;
} = {
  [EventStatus.NOMS_STAGING]: 'Pending Release', // shouldn't show this to user
  [EventStatus.NOMS_LIVE]: 'Predict Nominations',
  [EventStatus.WINS_STAGING]: 'Nominations Closed',
  [EventStatus.WINS_LIVE]: 'Predict Winners',
  [EventStatus.ARCHIVED]: 'Archived',
};
