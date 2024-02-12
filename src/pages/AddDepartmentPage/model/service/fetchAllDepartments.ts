import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AllDepartmentsApiResponse } from '../types/departmentTypes';

export const fetchAllDepartments = createAsyncThunk<
  AllDepartmentsApiResponse,
  {},
  ThunkConfig<string>
>('fetchAllDepartments', async (prop, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  const token = Cookies.get('token');

  try {
    const response = await extra.api.get<AllDepartmentsApiResponse>(
      'department/all',
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
