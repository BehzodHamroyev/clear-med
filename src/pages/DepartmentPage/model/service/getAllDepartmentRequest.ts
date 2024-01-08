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

    console.log(response, 'department');

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    console.log(e, 'department');
    return rejectWithValue('error');
  }
});
