import React from 'react';
import { initSentry } from './core/monitoring/sentry';
import AppInitializer from './core/navigation/AppInitializer';
import * as Sentry from '@sentry/react-native';
import { Provider } from 'react-redux';
import { store } from './app/store/store';

initSentry();

const App = () => {
  return(
    <Provider store={store}>
      <AppInitializer />
    </Provider>
  );
};

export default Sentry.wrap(App);