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
        // eslint-disable-next-line max-len
        config.headers.Authorization = token ? `Bearer ${token}` : 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJQZXJtaXNzaW9ucyI6WyJDYW5WaWV3RmluYW5jZUZvclBheXJvbGwiLCJDYW5WaWV3QW5hbHl0aWMiLCJDYW5NYW5hZ2VFbXBsb3llZXMiXSwiZXhwIjoxNjczMjgyOTY4fQ.AW6qMuOtOgKHkvXUG7DARY_gHZm063Jjn0Fs5eApxvaXiRO8_-zW4q9RUQpwzj0Z1IKszl8ygtlE_17uW47-LUifmjwwz_nbNCe1aaSwv6_MFpG5OPPQzt2lZOcQ5hTKhU3zE6MpjkdYjKcyrivnPZMx1NOlXTQTErboff96WKhwbXs2z0ZsJBgvoENHbinWtjABmkU5-G6J-MZCgLwI8OeRs0Dlavaqa1m90lXwyWzQrKIJ2XLKbAg9cjX6msxTYdo4jrnpUvDq9ofxgismrk0f5RW9u_ZJBkis7FMu3gqU8w0cy3hV5Tv38dfnfAdNEzP7VbZky5qwQQZ2rJ6GwQ';
      }

      return config;
    },
  );

  return apiConfig;
};

export const api = createAPI();
