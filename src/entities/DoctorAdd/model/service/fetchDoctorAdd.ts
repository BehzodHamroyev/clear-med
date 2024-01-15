import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { DoctorAddTypes } from '../types/doctorAddTypes';

const baseUrl = 'http://magicsoft.uz/med/api/v1/';

export const fetchDepartmentAdd = createAsyncThunk<
  DoctorAddTypes,
  { name: string; image: string; duration: number },
  ThunkConfig<string>
>('DepartmentAdd', async ({ name, image, duration }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  const token = localStorage.getItem('token');

  try {
    const response = await axios.post<DoctorAddTypes>(
      `${baseUrl}department/create`,
      {
        name,
        image,
        duration,
      },
      {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (e) {
    console.log(e, 'department');
    return rejectWithValue('error');
  }
});
