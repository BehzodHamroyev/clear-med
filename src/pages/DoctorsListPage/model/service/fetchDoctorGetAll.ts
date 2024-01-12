import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import axios from 'axios';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { DoctorListPage } from '../types/doctorListTypes';

export const fetchDoctorGetAll = createAsyncThunk<
  DoctorListPage,
  {},
  ThunkConfig<string>
>('getAllDoctor', async (prop, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  const token = Cookies.get('token');

  const baseUrl = 'https://magicsoft.uz/med/api/v1/';

  try {
    const response = await axios.get<DoctorListPage>(
      `${baseUrl}users?role=doctor`,
      {
        maxBodyLength: Infinity,
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log(response.data);

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
