import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  MonitorRoomData,
  MonitorRoomListSchema,
} from '../types/allMonitorTypes';
import { fetchGetAllRoomAtachmentMonitorOne } from '../service/fetchGetAllRoomAtachmentMonitor';

const initialState: MonitorRoomListSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const GetAllRoomAtachmentMonitorSlice = createSlice({
  name: 'getAllRoomAtachmentMonitorSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetAllRoomAtachmentMonitorOne.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchGetAllRoomAtachmentMonitorOne.fulfilled,
        (state, action: PayloadAction<MonitorRoomData>) => {
          state.isLoading = false;
          // @ts-ignore
          state.data = action.payload;
        },
      )
      .addCase(fetchGetAllRoomAtachmentMonitorOne.rejected, (state, action) => {
        state.error = `Serverda qandaydir xatolik bor. Sahifani qayta yuklang!`;
        state.isLoading = false;
      });
  },
});

export const { actions: GetAllRoomAtachmentMonitorActions } =
  GetAllRoomAtachmentMonitorSlice;
export const { reducer: GetAllRoomAtachmentMonitorReducer } =
  GetAllRoomAtachmentMonitorSlice;
