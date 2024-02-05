import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AllMonitorsTypeSchema } from '../types/monitorTypeSchema';
import { fetchAllMonitors } from '../services/fetchAllMonitors';
import { MonitorApiResponse } from '../types/monitorTypes';

const initialState: AllMonitorsTypeSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const allMonitorsSlice = createSlice({
  name: 'All Monitors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMonitors.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchAllMonitors.fulfilled,
        (state, action: PayloadAction<MonitorApiResponse>) => {
          state.isLoading = false;
          state.data = action.payload.data;
        },
      )
      .addCase(fetchAllMonitors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: allMonitorsActions } = allMonitorsSlice;
export const { reducer: allMonitorsReducer } = allMonitorsSlice;
