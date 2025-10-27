import { Platform } from 'react-native';
import * as Sentry from '@sentry/react-native';
import chalk from 'chalk';

const originalConsoleLog = console.log;

export const log = (...args: any[]) => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    originalConsoleLog(chalk.blue('[LOG]'), ...args);
  } else {
    console.log('[LOG]', ...args);
  }

  Sentry.addBreadcrumb({
    category: 'log',
    message: args.map(a => (typeof a === 'object' ? JSON.stringify(a) : a)).join(' '),
    level: 'info',
  });
};

export const logError = (...args: any[]) => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    originalConsoleLog(chalk.red('[ERROR]'), ...args);
  } else {
    console.error('[ERROR]', ...args);
  }

  Sentry.captureMessage(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : a)).join(' '));
};

export const logWarn = (...args: any[]) => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    originalConsoleLog(chalk.yellow('[WARN]'), ...args);
  } else {
    console.warn('[WARN]', ...args);
  }

  Sentry.addBreadcrumb({
    category: 'warn',
    message: args.map(a => (typeof a === 'object' ? JSON.stringify(a) : a)).join(' '),
    level: 'warning',
  });
};
