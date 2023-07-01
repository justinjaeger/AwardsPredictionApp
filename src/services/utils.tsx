import { API } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import Snackbar from '../components/Snackbar';
import SlackApi, { SlackChannel } from './slack';
import JwtService from './jwt';
import KeychainStorage from './keychain';
import KeychainEventEmitter from '../util/keychainEventEmitter';

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
  // TODO: Catch unauthorized errors - log user out if unauthorized
  const isUnauthorized = error?.errors?.[0]?.errorType === 'Unauthorized';
  const m = message || error?.message || 'something went wrong';
  if (isUnauthorized) {
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
    Message: ${message}
    Error: ${JSON.stringify(error)}
    m: ${m}
  `;
  SlackApi.sendMessage(allInfo, SlackChannel.ERRORS);
  return { status: 'error', message: m, error: error.name };
};

/**
 * Handles all PUBLIC requests
 */
export const GraphqlAPIPublic = async <Query, Variables>(
  query: string,
  variables?: Variables,
) => {
  // NOTE: If you do authMode = AWS_LAMBDA, you have to pass SOME STRING... even if it's garbage
  // If you do authMode = API_KEY it doesn't matter what that field is
  return API.graphql<GraphQLQuery<Query>>({
    query,
    // @ts-ignore
    variables,
    authMode: 'API_KEY',
  });
};

/**
 * For all requests that require authentication
 * Important: handles expired tokens
 * This means can assume the access token is valid in the Lambda check (it doesn't need to handle expired)
 * If refreshing the token fails, we log the user out, and the request resumes with an undefined token
 */
export const GraphqlAPIProtected = async <Query, Variables>(
  query: string,
  variables?: Variables,
) => {
  const { data: payload } = await KeychainStorage.get();
  const { accessToken, refreshToken } = payload || {};
  console.log('accessToken', accessToken); // TODO: delete before deploying
  console.log('refreshToken', refreshToken); // TODO: delete before deploying

  let verifiedAccessToken: string | undefined;
  if (accessToken && refreshToken) {
    const { data } = await JwtService.verifyOrRefresh(accessToken, refreshToken);
    verifiedAccessToken = data?.verifiedAccessToken;
    if (!verifiedAccessToken) {
      console.error('verifyOrRefresh has failed');
      await KeychainStorage.remove();
      KeychainEventEmitter.emit(); // this will sign the user out
    } else if (verifiedAccessToken !== accessToken) {
      // if there's a new token
      console.error('setting new access token...'); // TODO: remove
      await KeychainStorage.set(verifiedAccessToken, refreshToken);
    }
  }

  // NOTE: If you do authMode = AWS_LAMBDA, you have to pass SOME STRING... even if it's garbage
  // If you do authMode = API_KEY it doesn't matter what that field is
  return API.graphql<GraphQLQuery<Query>>({
    query,
    // @ts-ignore
    variables,
    authToken: verifiedAccessToken || 'none',
  });
};

/**
 * We use this in jwt/verifyOrRefresh
 * Necessary so we don't do infinite loop
 * Because the Token table is PRIVATE, even for read operations, we need the refresh token to read itself from the database
 * If it reads itself, it signals that it's safe to replenish the access token
 */
export const GraphqlAPIRefreshToken = async <Query, Variables>(
  query: string,
  variables?: Variables,
) => {
  //   const { refreshToken } = useAuth();
  const { data: payload } = await KeychainStorage.get();
  const { refreshToken } = payload || {};

  return API.graphql<GraphQLQuery<Query>>({
    query,
    // @ts-ignore
    variables,
    authToken: refreshToken,
  });
};
