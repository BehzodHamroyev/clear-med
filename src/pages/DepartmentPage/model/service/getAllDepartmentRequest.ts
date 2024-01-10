import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '@/app/providers/StoreProvider';
// import { DepartmentType } from '../types/departmentType';

export const fetchDepartmentGetAll = createAsyncThunk<
  any,
  {},
  ThunkConfig<string>
>('DepartmentAdd', async (prop, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await axios.get<any>(
      `http://magicsoft.uz/med/api/v1/department/all`,
      {},
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
