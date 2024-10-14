import { PayloadAction } from '@reduxjs/toolkit';
import {
  QueuesControlDoctorSchema,
  QueueApiResponseControlDoctorTypes,
  Queue,
} from '../..';
import { fetchDoneQueuesControlDoctor } from '../services/fetchDoneQueuesControlDoctor';
import { buildSlice } from '@/shared/lib/store';

const initialState: QueuesControlDoctorSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const doneQueuesControlDoctorSlice = buildSlice({
  name: 'Done Queues Control Doctor ',
  initialState,
  reducers: {
    addDoneQueue: (state, { payload }: PayloadAction<Queue>) => {
      if (!state.data?.some((item) => item._id === payload._id)) {
        state.data?.push(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoneQueuesControlDoctor.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchDoneQueuesControlDoctor.fulfilled,
        (state, action: PayloadAction<QueueApiResponseControlDoctorTypes>) => {
          state.isLoading = false;

          state.data = action.payload.data;
        },
      )
      .addCase(fetchDoneQueuesControlDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: doneQueuesControlDoctorActions } =
  doneQueuesControlDoctorSlice;
export const { reducer: doneQueuesControlDoctorReducer } =
  doneQueuesControlDoctorSlice;
export const { useActions: useDoneQueuesControlDoctorActons } =
  doneQueuesControlDoctorSlice;
