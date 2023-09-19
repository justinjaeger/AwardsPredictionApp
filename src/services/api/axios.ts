import axios from 'axios';
import { API_ENDPOINT } from '../../config';
import KeychainStorage from '../keychain';

const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
});

// TODO: is this bad that it's async? Monitor performance
axiosInstance.interceptors.request.use(async (config) => {
  const startTime = performance.now();
  const res = await KeychainStorage.get();
  const endTime = performance.now();
  console.log('KeychainStorage.get() took ' + (endTime - startTime) + ' milliseconds.');

  const accessToken = res.data?.accessToken;
  if (accessToken) {
    const headers = config.headers || {};
    headers.Authorization = `Token ${accessToken}`;
    config.headers = headers;
  }
  return config;
});

export default axiosInstance;
