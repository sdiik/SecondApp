import { Sentry } from '../monitoring/sentry';
import { log, logError } from '../utils/logger';

export function handleApiError(error: any) {
  if (error.response) {
    const { status, data, config } = error.response;
    
    log('🚨 [API ERROR RESPONSE]', {
      url: config.url,
      status,
      data,
    });
        
  } else if (error.request) {
    logError('⚠️ [NO RESPONSE RECEIVED]', error.request);
  } else {
    logError('💥 [REQUEST SETUP ERROR]', error.message);
  }
}
