import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer, { initialState } from '../features/auth/state/authSlice';
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

const EXPIRE_TIME =
  (Number(process.env.NEXT_PUBLIC_SESSION_EXPIRY_HOURS) || 1) * 60 * 60 * 1000;

const expireTransform = createTransform(
  // inbound: add timestamp
  (inboundState, key) => {
    const result = { ...(inboundState || {}), _persistedAt: Date.now() };
    return result;
  },
  // outbound: check expiration
  (outboundState, key) => {
    if (key !== 'auth' || !outboundState || typeof outboundState !== 'object')
      return initialState;
    if (!('_persistedAt' in outboundState) || !outboundState._persistedAt)
      return outboundState;
    const expired = Date.now() - outboundState._persistedAt > EXPIRE_TIME;
    if (expired) {
      return initialState;
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
      auth: state?.auth ?? initialState,
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

export const getPersistedAt = (state: RootState) => state.auth?._persistedAt;
export { EXPIRE_TIME };
