import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchRoomDelete = createAsyncThunk<
  any,
  { idCard: string | number },
  ThunkConfig<string>
>('roomDelete', async ({ idCard }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  const token = Cookies.get('token');

  try {
    const response = await axios.delete<any>(`${baseUrl}/room/${idCard}`, {
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
