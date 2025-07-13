import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { parseJwt } from '@inform-ag-boilerplate-v2/utils';

interface AuthState {
  jwt?: string;
  user: null | { email: string };
  token: string | null;
  isAuthenticated: boolean;
  _persistedAt?: number;
}

export const initialState: AuthState = {
  jwt: undefined,
  user: null,
  token: null,
  isAuthenticated: false,
  _persistedAt: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(
      state,
      action: PayloadAction<{ user: { email: string }; token: string }>
    ) {
      state.jwt = parseJwt(action.payload.token);
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state._persistedAt = Date.now();
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.jwt = undefined;
      state.isAuthenticated = false;
    },
    refreshSession(state) {
      state._persistedAt = Date.now();
    },
  },
});

export const { setAuth, logout, refreshSession } = authSlice.actions;
export default authSlice.reducer;
export type { AuthState };
