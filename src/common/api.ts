import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { authService } from './authService';

const createAPI = (): AxiosInstance => {
  const apiConfig = axios.create({
    baseURL: 'http://localhost:5000/api/',
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
