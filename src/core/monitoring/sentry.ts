import * as Sentry from '@sentry/react-native';

export function initSentry() {
  Sentry.init({
    dsn: 'https://596c7d06e34d1aa9c09668842ce6ed12@o4510225265590272.ingest.de.sentry.io/4510225269981264',
    debug: __DEV__,
    tracesSampleRate: 1.0,
    enableNative: true,
    sendDefaultPii: true,
    enableLogs: true,

    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,

    integrations: [
      Sentry.mobileReplayIntegration(),
      Sentry.feedbackIntegration(),
    ],

  });
}

export { Sentry };