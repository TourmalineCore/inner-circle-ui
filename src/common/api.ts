import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { authService } from './authService';
import { API_ROOT } from './config/config';

const createAPI = (): AxiosInstance => {
  const apiConfig = axios.create({
    baseURL: API_ROOT,
  });

  apiConfig.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = authService.getAuthToken();

      if (config.headers) {
        config.headers.Authorization = token ? `Bearer ${token}` : '';
      }

      return config;
    },
  );

  return apiConfig;
};

export const api = createAPI();
