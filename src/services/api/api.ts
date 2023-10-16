import Snackbar from '../../components/Snackbar';
import { API_ENDPOINT } from '../../config';
import * as EndAllSessionsEventEmitter from '../../util/endSessionsEventEmitter';
import KeychainStorage from '../keychain';
import axiosInstance from './axios';
import { ApiResponse, ClientResponse } from './types';
import axios from 'axios';

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
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  body?: any,
): Promise<ClientResponse<D>> => {
  const endAllSessions = async (): Promise<ClientResponse<D>> => {
    EndAllSessionsEventEmitter.emit();
    return { status: 'error', message: 'Invalid credentials' };
  };

  const {
    data: { error, message, data },
  } = await axiosInstance[method]<ApiResponse<D>>(url, body);
  if (error) {
    if (error === 'TokenExpiredError') {
      console.log('TokenExpiredError');
      const res = await KeychainStorage.get();
      const refreshToken = res?.data?.refreshToken;
      if (!refreshToken) {
        return endAllSessions();
      }
      // request new access token with refresh token
      const { data } = await axios.get<ApiResponse<string>>(`${API_ENDPOINT}/tokens`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      const newAccessToken = data.data;
      if (newAccessToken) {
        // set the new access token and new refresh token in keychain
        await KeychainStorage.set(newAccessToken, refreshToken);
        // retry the original request (it should catch the new token now)
        const {
          data: { error, message, data },
        } = await axiosInstance[method]<ApiResponse<D>>(url, body);
        if (error) {
          Snackbar.error(message || 'An error occurred');
          return {
            status: 'error',
            message: message || 'An error occurred',
          };
        } else {
          return { status: 'success', data: data };
        }
      } else {
        return endAllSessions();
      }
    }
    Snackbar.error(message || 'An error occurred');
    return {
      status: 'error',
      message: message || 'An error occurred',
    };
  } else {
    return { status: 'success', data: data };
  }
};

const api = {
  get: async <D>(url: string) => apiWrapper<D>('get', url),
  post: async <D, P>(url: string, body: P) => apiWrapper<D>('post', url, body),
  put: async <D, P>(url: string, body: P) => apiWrapper<D>('put', url, body),
  delete: async <D>(url: string) => apiWrapper<D>('delete', url),
};

export default api;
