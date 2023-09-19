import {
  TMDB_API_KEY as ENV_TMDB_API_KEY,
  SLACK_BOT_TOKEN as ENV_SLACK_BOT_TOKEN,
  JWT_SECRET as ENV_JWT_SECRET,
  GOOGLE_AUTH_CLIENT_ID as ENV_GOOGLE_AUTH_CLIENT_ID,
  // eslint-disable-next-line import/no-unresolved
} from '@env';

/**
 * 1. Update .env
 * 2. Update types/env.d.tsx
 * 3. Update this file
 * 4. run "yarn start" (has the --clean cache flag on it)
 * 5. run "yarn ios" to rebuild
 */
export const TMDB_API_KEY = ENV_TMDB_API_KEY as string;
export const SLACK_BOT_TOKEN = ENV_SLACK_BOT_TOKEN as string;
export const JWT_SECRET = ENV_JWT_SECRET as string;
export const GOOGLE_AUTH_CLIENT_ID = ENV_GOOGLE_AUTH_CLIENT_ID as string;
