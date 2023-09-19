import Snackbar from '../../components/Snackbar';
import axiosInstance from './axios';
import { ApiResponse, ClientResponse } from './types';
import { AxiosResponse } from 'axios';

/**
 * Returns request with status of either "success" or "error"
 * If error, displays message back to user
 * If success, returns data
 */
const apiWrapper = async <D>(
  promise: Promise<AxiosResponse<ApiResponse<D>>>,
): Promise<ClientResponse<D>> => {
  const { data } = await promise;
  if (data.error) {
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
