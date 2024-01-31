import { PayloadAction } from '@reduxjs/toolkit';
import {
  QueuesControlDoctorSchema,
  QueueApiResponseControlDoctorTypes,
  Queue,
} from '../..';
import { fetchQueuesControlDoctor } from '../services/fetchQueuesControlDoctor';
import { buildSlice } from '@/shared/lib/store';

const initialState: QueuesControlDoctorSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const queuesControlDoctorSlice = buildSlice({
  name: 'Queues Control Doctor ',
  initialState,
  reducers: {
    addQueue: (state, { payload }: PayloadAction<Queue>) => {
      if (!state.data?.some((item) => item._id === payload._id)) {
        state.data?.push(payload);
      }
    },
    removeQueue: (state, { payload }: PayloadAction<Queue>) => {
      if (payload?._id) {
        state.data = state.data?.filter((item) => item._id !== payload._id);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueuesControlDoctor.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchQueuesControlDoctor.fulfilled,
        (state, action: PayloadAction<QueueApiResponseControlDoctorTypes>) => {
          state.isLoading = false;

          state.data = action.payload.data;
        },
      )
      .addCase(fetchQueuesControlDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: queuesControlDoctorActions } = queuesControlDoctorSlice;
export const { reducer: queuesControlDoctorReducer } = queuesControlDoctorSlice;
export const { useActions: useQueuesControlDoctorActions } =
  queuesControlDoctorSlice;
