import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchTv } from '../service/fetchTv';
import { DataTv } from '../types/fetchType';
import { TvDataSchema } from '../types/fetchTypeSchema';

const initialState: TvDataSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const TvDataSlice = createSlice({
  name: 'Tv Data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTv.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchTv.fulfilled, (state, action: PayloadAction<DataTv>) => {
        state.isLoading = false;

        state.data = action.payload.monitor;
      })
      .addCase(fetchTv.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: tvDataActions } = TvDataSlice;
export const { reducer: tvDataReducer } = TvDataSlice;
