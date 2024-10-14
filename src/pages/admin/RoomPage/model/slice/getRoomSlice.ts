import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RoomListSchema, GetAllRoom } from '../types/RoomTypes';

import { fetchRoomGetAll } from '../service/getAllRoomRequest';

const initialState: RoomListSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const RoomListSlice = createSlice({
  name: 'RoomListSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomGetAll.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchRoomGetAll.fulfilled,
        (state, action: PayloadAction<GetAllRoom>) => {
          state.isLoading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchRoomGetAll.rejected, (state, action) => {
        state.error = `Serverda qandaydir xatolik bor. Sahifani qayta yuklang!`;
        state.isLoading = false;
      });
  },
});

export const { actions: RoomListSliceActions } = RoomListSlice;
export const { reducer: RoomListSliceReducer } = RoomListSlice;
