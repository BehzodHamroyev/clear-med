import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { fetchGetAllMonitors } from '../service/fetchGetAllMonitors';
import { AllMonitorListSchema, Monitor } from '../types/allMonitorTypes';

const initialState: AllMonitorListSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const GetAllMonitorPage = createSlice({
  name: 'AllMonitorListSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetAllMonitors.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchGetAllMonitors.fulfilled,
        (state, action: PayloadAction<Monitor>) => {
          state.isLoading = false;

          state.data = action.payload.data;
        },
      )
      .addCase(fetchGetAllMonitors.rejected, (state, action) => {
        state.error = `Serverda qandaydir xatolik bor. Sahifani qayta yuklang!`;
        state.isLoading = false;
      });
  },
});

export const { actions: GetAllMonitorPageActions } = GetAllMonitorPage;
export const { reducer: GetAllMonitorPageReducer } = GetAllMonitorPage;
