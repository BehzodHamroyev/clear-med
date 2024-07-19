import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { baseUrl } from '../../../../../baseurl';
import { DoctorEditType } from '../types/doctorEdit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchDoctorEdit = createAsyncThunk<
  DoctorEditType,
  { data: any },
  ThunkConfig<string>
>('DoctorEdit', async ({ data }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  const token = Cookies.get('token');

  try {
    const response = await axios.patch<DoctorEditType>(
      `${baseUrl}/users/${data.idCard}`,
      data,
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
    return rejectWithValue('error');
  }
});
