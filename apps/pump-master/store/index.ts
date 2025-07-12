import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer, {
  authInitialState,
} from '../features/auth/state/authSlice';
import pumpReducer from '../features/pumps/state/pumpSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createTransform } from 'redux-persist';

// Expiration time in ms (e.g., 1 hour)
const EXPIRE_TIME = 60 * 60 * 1000;

const expireTransform = createTransform(
  // inbound: add timestamp
  (inboundState, key) => {
    return { ...(inboundState || {}), _persistedAt: Date.now() };
  },
  // outbound: check expiration
  (outboundState, key) => {
    if (key !== 'auth' || !outboundState || typeof outboundState !== 'object')
      return authInitialState;
    if (!('_persistedAt' in outboundState) || !outboundState._persistedAt)
      return outboundState;
    const expired = Date.now() - outboundState._persistedAt > EXPIRE_TIME;
    if (expired) {
      return authInitialState;
    }
    return { ...outboundState };
  },
  { whitelist: ['auth'] }
);

const rootReducer = (state: any, action: any) => {
  return combineReducers({
    auth: authReducer,
    pump: pumpReducer,
  })(
    {
      auth: state?.auth ?? authInitialState,
      pump: state?.pump ?? undefined,
    },
    action
  );
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // only persist auth slice
  transforms: [expireTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
