import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  QueuesControlDoctorSchema,
  QueueApiResponseControlDoctorTypes,
} from '../..';
import { fetchDoneQueuesControlDoctor } from '../services/fetchDoneQueuesControlDoctor';

const initialState: QueuesControlDoctorSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const doneQueuesControlDoctorSlice = createSlice({
  name: 'Queues Control Doctor ',
  initialState,
  reducers: {},
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
