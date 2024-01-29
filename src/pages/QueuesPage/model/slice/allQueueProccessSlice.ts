import { PayloadAction } from '@reduxjs/toolkit';

import { buildSlice } from '@/shared/lib/store';

import { fetchAllQueueProccess } from '../services/fetchAllQueueProccess';
import { AllQueueProccessSchema } from '../types/allQueueProccessSchema';
import { AllQueueProccessApiResponse } from '../types/allQueueProccessTypes';
import { Queue } from '@/pages/QueuesControlDoctor';

const initialState: AllQueueProccessSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const allQueueProccessSlice = buildSlice({
  name: 'All Queue Proccess',
  initialState,
  reducers: {
    clearProccessQueue: (state) => {
      if (state.data) {
        state.data.proccessQueues = [];
      }
    },

    removeProccessQueue: (state, { payload }: PayloadAction<Queue>) => {
      if (state.data) {
        state.data.proccessQueues = state.data.proccessQueues.filter(
          (item) => item._id !== payload._id,
        );
      }
    },

    addProccessQueue: (state, { payload }: PayloadAction<Queue>) => {
      if (
        !state.data?.proccessQueues.some((item) => item._id === payload._id)
      ) {
        state.data?.proccessQueues.push(payload);
      }
    },

    recallQueue: (state, { payload }: PayloadAction<Queue>) => {
      state.data?.proccessQueues.forEach((item) => {
        if (item._id === payload._id) {
          item.status = payload.status;
        }
      });
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

          if (!state.data) {
            state.data = {
              videoUrl: [],
              proccessQueues: [],
            };
          }

          state.data.videoUrl = [
            ...action.payload.monitor.videos,
            ...state.data.videoUrl,
          ];

          action.payload.monitor.rooms.forEach((item) => {
            if (item.proceed?.length > 0) {
              state.data?.proccessQueues.push(item.proceed[0]);
            }
          });
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
