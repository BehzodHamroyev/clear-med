import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchQueuesProccess } from '../services/fetchQueuesProccess';
import { ProccessControlPanelDoctorSchema } from '../types/controlPanelDocktorSchema';
import { ProccesApiResponseControlPanelDoctorTypes } from '../types/controlPanelDocktorTypes';

const initialState: ProccessControlPanelDoctorSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const controlPanelDoctorSlice = createSlice({
  name: 'Proccess Control Doctor ',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueuesProccess.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchQueuesProccess.fulfilled,
        (
          state,
          action: PayloadAction<ProccesApiResponseControlPanelDoctorTypes>,
        ) => {
          state.isLoading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchQueuesProccess.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: controlPanelDoctorActions } = controlPanelDoctorSlice;
export const { reducer: controlPanelDoctorReducer } = controlPanelDoctorSlice;
