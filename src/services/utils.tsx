import Snackbar from '../components/Snackbar';
import SlackApi, { SlackChannel } from './slack';

export interface iApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  error?: any;
  message?: string;
}

export const handleError = (
  message?: string,
  error?: any,
  hideFromUser?: boolean,
): iApiResponse<any> => {
  const isInvalidToken =
    error?.errors[0]?.message === 'Request failed with status code 401';
  const isUnauthorized = error?.errors?.[0]?.errorType === 'Unauthorized';
  const m = message || error?.message || 'something went wrong';
  // create special cases here for errors that we want to handle differently
  if (isInvalidToken) {
    Snackbar.error('Unauthorized request');
  } else if (isUnauthorized) {
    // TODO: Might make more sense to verify the refresh token HERE instead of before we send the request.
    // My problem is, how do I reattempt the request after the refresh token is verified?
    console.error('Unauthorized error:', error);
    Snackbar.error(m);
  } else {
    console.error(message, JSON.stringify(error), m);
    if (!hideFromUser) {
      Snackbar.error(m);
    }
  }
  const allInfo = `
    Message: ${
      isInvalidToken ? 'Invalid token' : isUnauthorized ? 'Unauthorized' : message
    }
    Error: ${JSON.stringify(error)}
    m: ${m}
  `;
  SlackApi.sendMessage(allInfo, SlackChannel.ERRORS);
  return { status: 'error', message: m, error: error.name };
};
