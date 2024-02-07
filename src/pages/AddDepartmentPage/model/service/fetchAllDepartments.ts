import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AllDepartmentsApiResponse } from '../types/departmentTypes';

export const fetchAllDepartments = createAsyncThunk<
  AllDepartmentsApiResponse,
  {},
  ThunkConfig<string>
>('fetchAllDepartments', async (prop, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<AllDepartmentsApiResponse>(
      'department/all',
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
