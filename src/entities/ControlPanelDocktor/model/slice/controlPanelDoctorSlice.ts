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

          if (action.payload.data[0]?.status === 'proccessed') {
            state.data = action.payload;
          } else {
            state.data = {
              result: 0,
              status: '',
              data: [],
            };
          }
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
