import { GetUserQueryVariables } from '../../API';
import * as customQueries from '../../graphqlCustom/queries';
import { GetUserQuery } from '../../graphqlCustom/types';
import { SIGN_IN_PREFIX } from '../../hooks/useDeepLink';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';

// Should look like this
// "oscar://signin/?code=23849379752938759237"
const generateLink = () => {
  // random string of 12 characters including special characters
  const code = Math.random().toString(36).slice(-12);
  // STORE IN LOCAL STORAGE
  return SIGN_IN_PREFIX + '?code=' + code;
};
/**
 *  make this the SAME AS SIGN UP
 *  if we haven't seen this email before, create a new user with that email
 *  now we have a user
 *  generate a LINK for that user and store it in local storage with an expiration time
 *  send the link to their email
 */
const signIn = async (email: string): Promise<iApiResponse<GetUserQuery>> => {
  try {
    // const { data, errors } = await GraphqlAPI<GetUserQuery, GetUserQueryVariables>(
    //   customQueries.getUserBasic,
    //   { id },
    // );
    // if (!data?.getUser) {
    //   throw new Error(JSON.stringify(errors));
    // }
    return { status: 'success' };
  } catch (err) {
    return handleError('error getting user - try logging out', err);
  }
};

/**
 * checks for the link in local storage
 * if exists, log them in
 * if not, send them some error like "bad link"
 */
const confirmCode = async (
  link: string,
  code: string,
): Promise<iApiResponse<GetUserQuery>> => {
  try {
    // const { data, errors } = await GraphqlAPI<GetUserQuery, GetUserQueryVariables>(
    //   customQueries.getUserBasic,
    //   { id },
    // );
    // if (!data?.getUser) {
    //   throw new Error(JSON.stringify(errors));
    // }
    return { status: 'success' };
  } catch (err) {
    return handleError('error getting user - try logging out', err);
  }
};
