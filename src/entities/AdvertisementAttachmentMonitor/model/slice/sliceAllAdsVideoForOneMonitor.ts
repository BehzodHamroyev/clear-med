import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getAllAdsVideoForOneMonitor } from '../service/getAllAdsVideoForOneMonitor';
import { MonitorAdsBackend, MonitorAdsInRedux } from '../types/addsTypes';

const initialState: MonitorAdsInRedux = {
  isLoading: true,
  error: undefined,
  data: [],
};

export const sliceAllAdsVideoForOneMonitor = createSlice({
  name: 'sliceAllAdsVideoForOneMonitor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAdsVideoForOneMonitor.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        getAllAdsVideoForOneMonitor.fulfilled,
        (state, action: PayloadAction<MonitorAdsBackend>) => {
          state.isLoading = false;
          // console.log(action.payload.monitor.videos, 'sksk');
          state.data = action.payload.monitor.videos;
        },
      )
      .addCase(getAllAdsVideoForOneMonitor.rejected, (state, action) => {
        // state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: sliceAllAdsVideoForOneMonitorActions } =
  sliceAllAdsVideoForOneMonitor;
export const { reducer: sliceAllAdsVideoForOneMonitorReducer } =
  sliceAllAdsVideoForOneMonitor;
