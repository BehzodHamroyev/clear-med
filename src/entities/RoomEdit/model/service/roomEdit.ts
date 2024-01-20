/* eslint-disable camelcase */
import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { baseUrl } from '../../../../../baseurl';
import { RoomEditType } from '../types/roomEdit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchRoomEdit = createAsyncThunk<
  RoomEditType,
  {
    name: number;
    doctor_id: string;
    department_id: string;
    idCard: string | number;
  },
  ThunkConfig<string>
>('RoomEdit', async ({ idCard, name, doctor_id, department_id }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  const token = Cookies.get('token');

  try {
    const response = await axios.patch<RoomEditType>(
      `${baseUrl}/room/${idCard}`,
      {
        name,
        doctor_id,
        department_id,
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
    console.log(e, 'Room');
    return rejectWithValue('error');
  }
});
