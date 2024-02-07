import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import Cookies from 'js-cookie';
import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchMonitorCardEdit = createAsyncThunk<
  any,
  {
    idCard: string | number;
    name: string;
  },
  ThunkConfig<string>
>('MonitorEditFetch', async ({ idCard, name }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  const token = Cookies.get('token');

  try {
    const response = await axios.patch(
      `${baseUrl}/users/${idCard}`,
      {
        name,
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
