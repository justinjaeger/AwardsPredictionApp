import {
  CreateTokenMutation,
  CreateTokenMutationVariables,
  DeleteTokenMutation,
  DeleteTokenMutationVariables,
  TokenByTokenQuery,
  TokenByTokenQueryVariables,
  TokenByUserIdQuery,
  TokenByUserIdQueryVariables,
} from '../../API';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { GraphqlAPI, GraphqlAPIRefreshToken, handleError, iApiResponse } from '../utils';

export const getToken = async (
  token: string,
): Promise<iApiResponse<TokenByTokenQuery>> => {
  try {
    // IMPORTANT that this uses the refresh token for the request, or else it would go in circles trying to refresh the token when it expires
    const { data, errors } = await GraphqlAPIRefreshToken<
      TokenByTokenQuery,
      TokenByTokenQueryVariables
    >(queries.tokenByToken, { token });
    if (!data?.tokenByToken) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success' };
  } catch (err) {
    return handleError('error getting token', err);
  }
};

export const getAllUserTokens = async (
  userId: string,
): Promise<iApiResponse<TokenByUserIdQuery>> => {
  try {
    const { data, errors } = await GraphqlAPIRefreshToken<
      TokenByUserIdQuery,
      TokenByUserIdQueryVariables
    >(queries.tokenByUserId, { userId });
    if (!data?.tokenByUserId) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success' };
  } catch (err) {
    return handleError('error getting all user tokens', err);
  }
};

export const createRefreshToken = async (
  token: string,
  userId: string,
): Promise<iApiResponse<CreateTokenMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      CreateTokenMutation,
      CreateTokenMutationVariables
    >(mutations.createToken, { input: { token, userId } });
    if (!data?.createToken) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success' };
  } catch (err) {
    return handleError('error creating refresh token', err);
  }
};

const deleteTokenById = async (
  tokenId: string,
  userId: string,
): Promise<iApiResponse<DeleteTokenMutation>> => {
  try {
    const { data, errors } = await GraphqlAPI<
      DeleteTokenMutation,
      DeleteTokenMutationVariables
    >(mutations.createToken, {
      input: { id: tokenId },
      condition: { userId: { eq: userId } },
    });
    if (!data?.deleteToken) {
      throw new Error(JSON.stringify(errors));
    }
    return { status: 'success' };
  } catch (err) {
    return handleError('error deleting token by id', err);
  }
};

export const deleteToken = async (
  refreshToken: string,
): Promise<iApiResponse<DeleteTokenMutation>> => {
  const { data } = await getToken(refreshToken);
  if (!data) {
    return { status: 'error' };
  }
  const tokenId = data.tokenByToken?.items[0]?.id; // should be only one
  const userId = data.tokenByToken?.items[0]?.userId;
  if (!tokenId) {
    return { status: 'error', message: 'token not found in deleteToken' };
  }
  if (!userId) {
    return { status: 'error', message: 'userId not found in deleteToken' };
  }
  const { status } = await deleteTokenById(tokenId, userId);
  return { status };
};
