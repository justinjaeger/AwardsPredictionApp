import api from '../api';

export const getAccessToken = async (userId: string) => {
  return await api.get<string>(`jwt?userId=${userId}`);
};

/**
 * Notably, must be still use the access token set in keychain to create
 */
export const createRefreshToken = async () => {
  return await api.post<string, Record<string, unknown>>('tokens', {});
};

/**
 * If you pass a token, it deletes that token
 * If you don't pass a token, it deletes all tokens associated with the authorized user
 */
type iRemoveTokenPayload = {
  token?: string;
  userId?: string;
};
export const removeToken = async (payload: iRemoveTokenPayload) => {
  return await api.put<undefined, iRemoveTokenPayload>('tokens', payload);
};
