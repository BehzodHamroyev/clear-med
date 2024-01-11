import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  QueuesControlDoctorSchema,
  QueueApiResponseControlDoctorTypes,
} from '../..';
import { fetchQueuesControlDoctor } from '../services/fetchQueuesControlDoctor';

const initialState: QueuesControlDoctorSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const queuesControlDoctorSlice = createSlice({
  name: 'Queues Control Doctor ',
  initialState,
  reducers: {},
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
