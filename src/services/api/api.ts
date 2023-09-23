import Snackbar from '../../components/Snackbar';
import { API_ENDPOINT } from '../../config';
import * as EndAllSessionsEventEmitter from '../../util/endSessionsEventEmitter';
import KeychainStorage from '../keychain';
import axiosInstance from './axios';
import { ApiResponse, ClientResponse } from './types';
import axios, { AxiosResponse } from 'axios';

/**
 * Returns request with status of either "success" or "error"
 * If error, displays message back to user
 * If success, returns data
 *
 * Also handles TokenExpiredError
 * When the access token expires, attempt to replenish with refresh token.
 * If fails, log user out
 */
const apiWrapper = async <D>(
  promise: Promise<AxiosResponse<ApiResponse<D>>>,
): Promise<ClientResponse<D>> => {
  const endAllSessions = async (): Promise<ClientResponse<D>> => {
    EndAllSessionsEventEmitter.emit();
    return { status: 'error', message: 'Invalid credentials' };
  };

  const { data } = await promise;
  if (data.error) {
    if (data.error === 'TokenExpiredError') {
      const res = await KeychainStorage.get();
      const refreshToken = res?.data?.refreshToken;
      if (!refreshToken) {
        return endAllSessions();
      }
      // request new access token with refresh token
      const { data } = await axios.get<
        ApiResponse<{
          accessToken: string;
          refreshToken: string;
        }>
      >(`${API_ENDPOINT}/tokens`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      const tokens = data.data;
      if (tokens) {
        // set the new access token and new refresh token in keychain
        await KeychainStorage.set(tokens.accessToken, tokens.refreshToken);
        // retry the original request (it should catch the new token now)
        return await apiWrapper(promise);
      } else {
        return endAllSessions();
      }
    }
    Snackbar.error(data.message || 'An error occurred');
    return {
      status: 'error',
      message: data.message || 'An error occurred',
    };
  } else {
    return { status: 'success', data: data.data };
  }
};

const api = {
  get: async <D>(url: string) => apiWrapper<D>(axiosInstance.get<ApiResponse<D>>(url)),
  post: async <D, P>(url: string, body: P) =>
    apiWrapper(axiosInstance.post<ApiResponse<D>>(url, body)),
  put: async <D, P>(url: string, body: P) =>
    apiWrapper(axiosInstance.put<ApiResponse<D>>(url, body)),
  delete: async <D>(url: string) => apiWrapper(axiosInstance.delete<ApiResponse<D>>(url)),
};

export default api;
