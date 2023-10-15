import api from '../api';

export const getAccessToken = async (userId: string) => {
  return await api.get<string>(`jwt?userId=${userId}`);
};

/**
 * Notably, must be still use the access token set in keychain to create
 */
export const createRefreshToken = async () => {
  return await api.post<string, void>('tokens', undefined);
};

/**
 * Remove single refresh token
 */
export const removeToken = async (token: string) => {
  return await api.delete<undefined>(`tokens/${token}`);
};

/**
 * Remove all refresh tokens associated with user
 */
export const removeUserTokens = async () => {
  return await api.delete<undefined>('tokens/user');
};
