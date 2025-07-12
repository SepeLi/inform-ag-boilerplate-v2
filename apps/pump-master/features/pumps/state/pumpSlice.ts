import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Pump {
  id: string;
  name: string;
  type: string;
  area: string;
  latitude: number;
  longitude: number;
  flowRate: string;
  offset: string;
  currentPressure: string;
  minPressure: string;
  maxPressure: string;
}

interface PumpState {
  pumps: Pump[];
  loading: boolean;
  error: string | null;
}

const initialState: PumpState = {
  pumps: [],
  loading: false,
  error: null,
};

const pumpSlice = createSlice({
  name: 'pump',
  initialState,
  reducers: {
    setPumps(state, action: PayloadAction<Pump[]>) {
      state.pumps = action.payload;
      state.loading = false;
      state.error = null;
    },
    setPumpLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setPumpError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setPumps, setPumpLoading, setPumpError } = pumpSlice.actions;
export default pumpSlice.reducer;
export type { PumpState };
