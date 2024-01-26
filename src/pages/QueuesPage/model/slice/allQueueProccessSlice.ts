import { PayloadAction } from '@reduxjs/toolkit';

import { buildSlice } from '@/shared/lib/store';

import { fetchAllQueueProccess } from '../services/fetchAllQueueProccess';
import { AllQueueProccessSchema } from '../types/allQueueProccessSchema';
import { AllQueueProccessApiResponse } from '../types/allQueueProccessTypes';

const initialState: AllQueueProccessSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const allQueueProccessSlice = buildSlice({
  name: 'All Queue Proccess',
  initialState,
  reducers: {
    clearCurrentQueue: (state) => {
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllQueueProccess.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchAllQueueProccess.fulfilled,
        (state, action: PayloadAction<AllQueueProccessApiResponse>) => {
          state.isLoading = false;

          state.data = action.payload;
        },
      )
      .addCase(fetchAllQueueProccess.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: allQueueProccessActions } = allQueueProccessSlice;
export const { reducer: allQueueProccessReducer } = allQueueProccessSlice;
export const { useActions: useAllQueueProccessActions } = allQueueProccessSlice;
