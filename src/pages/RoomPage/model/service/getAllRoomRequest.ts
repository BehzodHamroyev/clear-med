import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

import { GetAllRoom } from '../types/RoomTypes';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { baseUrl } from '../../../../../baseurl';

export const fetchRoomGetAll = createAsyncThunk<
  GetAllRoom,
  {},
  ThunkConfig<string>
>('getAllRoom', async (prop, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  const token = Cookies.get('token');

  try {
    const response = await axios.get<GetAllRoom>(`${baseUrl}/room/all`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
