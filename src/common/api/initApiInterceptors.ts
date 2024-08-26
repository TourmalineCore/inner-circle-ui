import { authService } from '../authService';

let isRefreshing = false;
let refreshQueue: any[] = [];

export function initApiInterceptors(api: any) {
  function axiosRequestSuccessInterceptor(config: any) {
    const token = authService.getAuthToken();

    if (config.headers) {
      config.headers.Authorization = token ? `Bearer ${token}` : '';
    }

    return config;
  }

  function axiosResponseErrorInterceptor(error: any) {
    const {
      config: originalConfig,
      // @ts-ignore
      response: { status } = {},
    } = error;

    if (status === 401) {
      return authService.setLoggedOut();
    }

    if (status !== 401) {
      return Promise.reject(error);
    }

    if (!authService.getAuthToken()) {
      return Promise.reject(error);
    }

    if (!isRefreshing) {
      isRefreshing = true;

      authService.refreshToken()
        .then(() => {
          const tokenValue = authService.getAuthToken();

          refreshQueue.forEach((v) => v.resolve(tokenValue));
          refreshQueue = [];
        })
        .catch(() => {
          refreshQueue.forEach((v) => v.reject(error));
          refreshQueue = [];

          authService.setLoggedOut();
        })
        .finally(() => {
          isRefreshing = false;
        });
    }

    return new Promise((resolve, reject) => {
      refreshQueue.push({
        resolve: (tokenValue: string) => {
          const config = {
            ...originalConfig,
            headers: {
              ...originalConfig?.headers,
              Authorization: `Bearer ${tokenValue}`,
            },
          };

          resolve(api.request(config));
        },
        reject: (err: any) => {
          reject(err);
        },
      });
    });
  }

  // @ts-ignore
  api.interceptors.request.use(axiosRequestSuccessInterceptor, null);
  // @ts-ignore
  api.interceptors.response.use(null, axiosResponseErrorInterceptor);
}
