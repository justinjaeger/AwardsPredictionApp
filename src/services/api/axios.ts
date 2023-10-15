import axios from 'axios';
import { API_ENDPOINT } from '../../config';
import KeychainStorage from '../keychain';

const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
});

// Attaches access token to every request
axiosInstance.interceptors.request.use(async (config) => {
  const startTime = performance.now();
  const res = await KeychainStorage.get();
  const endTime = performance.now();
  // takes from 70-200ms
  console.log('KeychainStorage.get() took ' + (endTime - startTime) + ' milliseconds.');

  const accessToken = res.data?.accessToken;
  if (accessToken) {
    const headers = config.headers || {};
    headers.Authorization = `Bearer ${accessToken}`;
    config.headers = headers;
  }
  return config;
});

export default axiosInstance;
