import { PayloadAction } from '@reduxjs/toolkit';
import { CurrentQueueSchemaForReception } from '../types/departmentListSchema';
import { CurrentQueueDataApiRespoceType } from '../types/departmentListTypes';
import { fetchCurrentQueue } from '../services/fetchCurrentQueue';
import { buildSlice } from '@/shared/lib/store';

const initialState: CurrentQueueSchemaForReception = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const currentQueue = buildSlice({
  name: 'Current Queueu ',
  initialState,
  reducers: {
    clearCurrentQueue: (state) => {
      console.log('clearedddddd');

      state.data = undefined;

      console.log(state.data, 'clearedddddd');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentQueue.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchCurrentQueue.fulfilled,
        (state, action: PayloadAction<CurrentQueueDataApiRespoceType>) => {
          state.isLoading = false;

          state.data = action.payload;
        },
      )
      .addCase(fetchCurrentQueue.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: currentQueueuActions } = currentQueue;
export const { reducer: currentQueueuReducer } = currentQueue;
export const { useActions: useCurrentQueueuActions } = currentQueue;
