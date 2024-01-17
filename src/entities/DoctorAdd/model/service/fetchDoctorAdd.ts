import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { baseUrl } from '../../../../../baseurl';
import { DoctorAddTypes } from '../types/doctorAddTypes';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchDoctorAdd = createAsyncThunk<
  DoctorAddTypes,
  {
    name: string;
    password: string;
    login: string | number;
    exprience: number | string;
    file: HTMLImageElement | string;
  },
  ThunkConfig<string>
>('DoctorAdd', async ({ name, login, password, exprience, file }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  const token = Cookies.get('token');

  try {
    const response = await axios.post<DoctorAddTypes>(
      `${baseUrl}/users`,
      {
        name,
        file,
        login,
        password,
        exprience,
        role: 'doctor',
      },
      {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      },
    );

    console.log(response, 'doctor response add');

    return response.data;
  } catch (e) {
    console.log(e, 'department');
    return rejectWithValue('error');
  }
});
