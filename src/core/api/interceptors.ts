import { AxiosInstance } from 'axios';
import { Sentry } from '../monitoring/sentry';
import { handleApiError } from './errorHandler';
import { log, logError } from '../utils/logger';

export function attachInterceptors(api: AxiosInstance) {
  api.interceptors.request.use(
    config => {
      if (__DEV__) {
        log('📤 [API REQUEST]', {
          url: `${config.baseURL}${config.url}`,
          method: config.method?.toUpperCase(),
          data: config.data,
          params: config.params,
        });
      }

      return config;
    },
    error => {
      logError('Request error', error);
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    response => {
      log('📥 [API RESPONSE]', {
        url: `${response.config.baseURL}${response.config.url}`,
        status: response.status,
        data: response.data,
      });
      return response;
    },
    error => {
      logError('Response error', error.response || error.message);
      return Promise.reject(error);
    },
  );
}
