import {
  TMDB_API_KEY as ENV_TMDB_API_KEY,
  SLACK_BOT_TOKEN as ENV_SLACK_BOT_TOKEN,
  JWT_SECRET as ENV_JWT_SECRET,
  // eslint-disable-next-line import/no-unresolved
} from '@env';

export const TMDB_API_KEY = ENV_TMDB_API_KEY as string;
export const SLACK_BOT_TOKEN = ENV_SLACK_BOT_TOKEN as string;
export const JWT_SECRET = ENV_JWT_SECRET as string;
