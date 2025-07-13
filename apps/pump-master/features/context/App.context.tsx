'use client';

import { AuthProvider } from '../auth/context/auth.context';
import { SSRBlocker } from './SSRBlocker/SSRBlocker';
import { Provider } from 'react-redux';
import { store, persistor } from '../../store';
import { PersistGate } from 'redux-persist/integration/react';
import { ReactNode } from 'react';

interface AppContextProps {
  children: ReactNode;
}

export const AppContext = ({ children }: AppContextProps) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SSRBlocker>
        <AuthProvider>{children}</AuthProvider>
      </SSRBlocker>
    </PersistGate>
  </Provider>
);
