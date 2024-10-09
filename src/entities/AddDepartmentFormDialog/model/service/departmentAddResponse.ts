import { createAsyncThunk } from '@reduxjs/toolkit';

import { baseUrl } from '../../../../../baseurl';
import { DepartmentType } from '../types/departmentType';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import instance from '@/shared/lib/axios/api';

export const fetchDepartmentAdd = createAsyncThunk<
  DepartmentType,
  { name: string; image: string; duration: number },
  ThunkConfig<string>
>('DepartmentAdd', async ({ name, image, duration }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await instance.post<DepartmentType>(
      `${baseUrl}/department/create`,
      {
        name,
        image,
        duration,
      },
    );

    return response.data;
  } catch (e: any) {
    return rejectWithValue('error');
  }
});
