import { EventType } from '../API';
import COLORS from './colors';

/**
 * Misc constants
 */

export const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

export const BOTTOM_TAB_HEIGHT = 50;

export const EVENT_TYPE_TO_STRING: {
  [key in EventType]: string;
} = {
  [EventType.WIN]: 'Wins',
  [EventType.NOMINATION]: 'Nominations',
};

export const headerStyle = {
  backgroundColor: COLORS.redDark,
};
export const headerTitleStyle = { color: COLORS.white };
export const headerSettings: any = {
  headerStyle,
  headerTitleStyle,
};
