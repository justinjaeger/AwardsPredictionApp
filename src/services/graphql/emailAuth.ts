import ApiServices from '.';
import { GetUserQueryVariables, User, UserRole } from '../../API';
import { useAuth } from '../../context/UserContext';
import * as customQueries from '../../graphqlCustom/queries';
import { GetUserQuery } from '../../graphqlCustom/types';
import { SIGN_IN_PREFIX } from '../../hooks/useDeepLink';
import Serializers from '../../serializers';
import { iUser } from '../../types';
import { GraphqlAPI, handleError, iApiResponse } from '../utils';

// Should look like this
// "oscar://signin/?code=1234567890"
const generateLink = () => {
  // random string of 12 characters including special characters
  const code = Math.random().toString(36).slice(-12);
  // STORE IN LOCAL STORAGE and make it expire in like 10 minutes
  return SIGN_IN_PREFIX + '?code=' + code;
};

/**
 *  works for both sign in AND sign up
 *  if we haven't seen this email before, create a new user with that email
 *  responds with a user object
 *
 *  TODO: must be followed up by:
 *  - generateVerificationCode via useAuth
 *  - generate link
 *  - emailing the link to the user via EmailService.sendConfirmationCode
 *  - giving feedback "we just texted a link th {EMAIL}"
 */
export const signIn = async (email: string): Promise<iApiResponse<iUser>> => {
  // get user with this email if exists
  const { data } = await ApiServices.getUserByEmail(email);
  let user = data?.userByEmail?.items?.[0];
  // if no user exists, create one
  if (!user) {
    const { data: createUserData } = await ApiServices.createUser(email, UserRole.USER);
    user = createUserData?.createUser;
  }
  if (!user) {
    return handleError('error signing in with email');
  } else {
    const serializedUser = Serializers.userSerializer(user);
    return { status: 'success', data: serializedUser };
  }
};

/**
 * TODO:
 * - parse the code from the link
 * - verify that the code is valid (is same in useAuth)
 * - if it's the same, user gets logged into the app (invoke signInUser from useAuth)
 */
export const confirmCode = async (
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

/**
 * LOGGING IN
 * - I already am not using apple or email sign in, but I'll need to also remove google sign in with amplify
 * - When the user logs in, it's going to set a TOKEN in async storage AND the db
 * - Async Storage token should persist forever
 * - Token is checked every POST request. Read requests are fine and don't need a token.
 */
