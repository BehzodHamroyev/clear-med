import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReportDoctorSchema, ReportDoctorTypes } from '../..';
import { fetchReportControlDoctor } from '../service/fetchReportDoctor';

const initialState: ReportDoctorSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const reportControlDoctorSlice = createSlice({
  name: 'Report Control Doctor ',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportControlDoctor.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchReportControlDoctor.fulfilled,
        (state, action: PayloadAction<ReportDoctorTypes>) => {
          state.isLoading = false;

          state.data = action.payload.data;
        },
      )
      .addCase(fetchReportControlDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: reportControlDoctorActions } = reportControlDoctorSlice;
export const { reducer: reportControlDoctorReducer } = reportControlDoctorSlice;
