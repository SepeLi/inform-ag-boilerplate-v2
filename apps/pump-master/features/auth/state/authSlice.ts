import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { parseJwt } from '../utils';

interface AuthState {
  jwt?: string;
  user: null | { email: string };
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  jwt: undefined,
  user: null,
  token: null,
  isAuthenticated: false,
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
      console.warn('state', action.payload);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
export type { AuthState };
