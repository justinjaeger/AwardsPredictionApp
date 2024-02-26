import axios from 'axios';
import { API_ENDPOINT } from '../../config';
import KeychainStorage from '../keychain';

const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
});

// Attaches access token to every request
axiosInstance.interceptors.request.use(async (config) => {
  const res = await KeychainStorage.get();
  const accessToken = res.data?.accessToken;
  if (accessToken) {
    const headers = config.headers || {};
    headers.Authorization = `Bearer ${accessToken}`;
    config.headers = headers;
  }
  return config;
});

export default axiosInstance;
