/* eslint-disable camelcase */
import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { baseUrl } from '../../../../../baseurl';
import { RoomAddTypes } from '../types/roomAddTypes';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchDoctorAdd = createAsyncThunk<
  RoomAddTypes,
  {
    name: number;
    doctor_id: string;
    department_id: string;
  },
  ThunkConfig<string>
>('DoctorAdd', async ({ department_id, doctor_id, name }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  const token = Cookies.get('token');

  try {
    const response = await axios.post<RoomAddTypes>(
      `${baseUrl}/room/create`,
      { department_id, doctor_id, name },
      {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      },
    );

    console.log(response, 'room response add');

    return response.data;
  } catch (e) {
    console.log(e, 'department');
    return rejectWithValue('error');
  }
});
