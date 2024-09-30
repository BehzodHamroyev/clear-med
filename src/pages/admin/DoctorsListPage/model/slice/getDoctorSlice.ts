import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DoctorListPage, DoctorListSchema } from '../types/doctorListTypes';
import { fetchDoctorGetAll } from '../service/fetchDoctorGetAll';

const initialState: DoctorListSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const DoctorListSlice = createSlice({
  name: 'DoctorListSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorGetAll.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchDoctorGetAll.fulfilled,
        (state, action: PayloadAction<DoctorListPage>) => {
          state.isLoading = false;

          state.data = action.payload.data;
        },
      )
      .addCase(fetchDoctorGetAll.rejected, (state, action) => {
        state.error = `Serverda qandaydir xatolik bor. Sahifani qayta yuklang!`;
        state.isLoading = false;
      });
  },
});

export const { actions: DoctorListSliceActions } = DoctorListSlice;
export const { reducer: DoctorListSliceReducer } = DoctorListSlice;
