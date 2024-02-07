import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AllRoomsApiResponse } from '../types/roomTypes';
import { AllRoomsTypeSchema } from '../types/roomTypesSchema';

import { fetchAllRooms } from '../services/fetchAllRooms';

const initialState: AllRoomsTypeSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const allRoomsSlice = createSlice({
  name: 'All Room',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRooms.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchAllRooms.fulfilled,
        (state, action: PayloadAction<AllRoomsApiResponse>) => {
          state.isLoading = false;
          state.data = action.payload.room;
        },
      )
      .addCase(fetchAllRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: allRoomsActions } = allRoomsSlice;
export const { reducer: allRoomsReducer } = allRoomsSlice;
