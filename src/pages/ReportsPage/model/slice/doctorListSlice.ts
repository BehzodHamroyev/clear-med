import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DoctorListScheam } from '../types/doctorListSchema';
import { fetchDoctorList } from '../services/fetchDoctorList';
import { DoctorListApiRecsponce } from '../types/doctorListTypes';

const initialState: DoctorListScheam = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const doctorListSlice = createSlice({
  name: 'Doctor List',
  initialState,
  reducers: {
    clearLastQueue: (state) => {
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorList.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchDoctorList.fulfilled,
        (state, action: PayloadAction<DoctorListApiRecsponce>) => {
          state.isLoading = false;

          state.data = action.payload.data;
        },
      )
      .addCase(fetchDoctorList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: doctorListActions } = doctorListSlice;
export const { reducer: doctorListReducer } = doctorListSlice;
