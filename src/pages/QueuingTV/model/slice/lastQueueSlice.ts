import { PayloadAction } from '@reduxjs/toolkit';
import { LastQueueDataSchema } from '../types/departmentListSchema';
import { LastQueueDataApiResponce } from '../types/departmentListTypes';
import { fetchLastQueue } from '../services/fetchLastQueue';
import { buildSlice } from '@/shared/lib/store';

const initialState: LastQueueDataSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const lastQueueSlice = buildSlice({
  name: 'Last Queue ',
  initialState,
  reducers: {
    clearLastQueue: (state) => {
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLastQueue.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchLastQueue.fulfilled,
        (state, action: PayloadAction<LastQueueDataApiResponce>) => {
          state.isLoading = false;

          state.data = action.payload;
        },
      )
      .addCase(fetchLastQueue.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: lastQueueActions } = lastQueueSlice;
export const { reducer: lastQueueReducer } = lastQueueSlice;
export const { useActions: useLasQueueActions } = lastQueueSlice;
