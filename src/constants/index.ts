import { EventType } from '../models';

/**
 * Misc constants
 */

export const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

export const BOTTOM_TAB_HEIGHT = 60;

export const EVENT_TYPE_TO_STRING: {
  [key in EventType]: string;
} = {
  [EventType.WIN]: 'Wins',
  [EventType.NOMINATION]: 'Nominations',
};
