import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { GetAllDepartment } from '../types/departmentTypes';

export const fetchDepartmentGetAll = createAsyncThunk<
  GetAllDepartment,
  {},
  ThunkConfig<string>
>('getAllDepartment', async (prop, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<GetAllDepartment>('department/all');

    console.log(response, '_______________response_______________');

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
