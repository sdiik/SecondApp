import axios, { AxiosInstance } from 'axios';
import * as Sentry from '@sentry/react-native';
import { log, logError } from '../utils/logger';
import { storage, StorageKeys } from '../../app/storage';

const DEFAULT_TIMEOUT = 10000;

declare module 'axios' {
  interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
}

// Public API (no auth)
export const apiPublic = axios.create({
  baseURL: 'https://api.restful-api.dev',
  timeout: DEFAULT_TIMEOUT,
});

// Protected API (Bearer token)
export const apiAuth = axios.create({
  baseURL: 'https://apimock.lazycatlabs.com/v1/api',
  timeout: DEFAULT_TIMEOUT,
});

const setupInterceptors = (instance: AxiosInstance, withAuth = false) => {
  // Request interceptor
  instance.interceptors.request.use(
    async config => {
      const shouldSkipAuth = config.skipAuth

      if (withAuth && !shouldSkipAuth) {
        const userToken = await storage.getItem<string>(StorageKeys.USER_TOKEN);
        const generalToken = await storage.getItem<string>(StorageKeys.GENERAL_TOKEN);

        const tokenToUse = userToken || generalToken;

        if (tokenToUse) {
          config.headers['Authorization'] = `Bearer ${tokenToUse}`;
        }
      }

      // Debug log di DEV
      if (__DEV__) {
        log('📤 [API REQUEST]', {
          url: `${config.baseURL}${config.url}`,
          method: config.method?.toUpperCase(),
          data: config.data,
          params: config.params,
          headers: config.headers,
        });
      }

      return config;
    },
    error => {
      logError('Request error', error);
      return Promise.reject(error);
    },
  );

  // Response interceptor
  instance.interceptors.response.use(
    response => {
      if (__DEV__) {
        log('📥 [API RESPONSE]', {
          url: `${response.config.baseURL}${response.config.url}`,
          status: response.status,
          data: response.data,
        });
      }
      return response;
    },
    error => {
      if (error.response) {
        const { config, status, data } = error.response;
         logError('Request error', error, {
          extra: {
            url: `${config.baseURL}${config.url}`,
            status,
            data,
            method: config.method?.toUpperCase(),
            requestData: config.data,
            requestParams: config.params,
          },
        }
      );
      } else if (error.request) {
        logError('Request error', new Error('No response from server'));
      } else {
        logError('Request error', error.message);
      }
      return Promise.reject(error);
    },
  );
};

setupInterceptors(apiPublic);
setupInterceptors(apiAuth, true);