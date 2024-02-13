import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DepartmentScheme, DepartmentType } from '../types/departmentType';
import { fetchDepartmentAdd } from '../service/departmentAddResponse';

const initialState: DepartmentScheme = {
  isLoading: false,
  error: '',
  data: undefined,
};

export const departmentAddSlice = createSlice({
  name: 'departmentAddSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartmentAdd.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(
        fetchDepartmentAdd.fulfilled,
        (state, action: PayloadAction<DepartmentType>) => {
          state.isLoading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchDepartmentAdd.rejected, (state, action) => {
        state.error = `Serverda qandaydir xatolik bor. Sahifani qayta yuklang!`;
        state.isLoading = false;

      });
  },
});

export const { actions: departmentAddSliceSliceActions } = departmentAddSlice;
export const { reducer: departmentAddSliceSliceReducer } = departmentAddSlice;
