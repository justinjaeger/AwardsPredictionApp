import {
  SLACK_BOT_TOKEN as ENV_SLACK_BOT_TOKEN,
  GOOGLE_AUTH_CLIENT_ID as ENV_GOOGLE_AUTH_CLIENT_ID,
  API_ENDPOINT as ENV_API_ENDPOINT,
  TMDB_API_KEY as ENV_TMDB_API_KEY,
  // eslint-disable-next-line import/no-unresolved
} from '@env';

/**
 * 1. Update .env
 * 2. Update types/env.d.tsx
 * 3. Update this file
 * 4. run "yarn start" (has the --reset-cache flag on it)
 * 5. run "yarn ios" to rebuild
 */
export const SLACK_BOT_TOKEN = ENV_SLACK_BOT_TOKEN;
export const GOOGLE_AUTH_CLIENT_ID = ENV_GOOGLE_AUTH_CLIENT_ID;
export const API_ENDPOINT = ENV_API_ENDPOINT;
export const TMDB_API_KEY = ENV_TMDB_API_KEY;
