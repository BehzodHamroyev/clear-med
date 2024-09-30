import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  MonitorRoomData,
  MonitorRoomListSchema,
} from '../types/allMonitorTypes';
import { fetchAllRoomForMonitor } from '../service/fetchAllRoomForMonitor';

const initialState: MonitorRoomListSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const GetAllRoomAtachmentMonitorSlice = createSlice({
  name: 'get All Room for Monitor Slice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRoomForMonitor.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchAllRoomForMonitor.fulfilled,
        (state, action: PayloadAction<MonitorRoomData>) => {
          state.isLoading = false;
          // @ts-ignore
          state.data = action.payload;
        },
      )
      .addCase(fetchAllRoomForMonitor.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: GetAllRoomAtachmentMonitorActions } =
  GetAllRoomAtachmentMonitorSlice;
export const { reducer: GetAllRoomAtachmentMonitorReducer } =
  GetAllRoomAtachmentMonitorSlice;
