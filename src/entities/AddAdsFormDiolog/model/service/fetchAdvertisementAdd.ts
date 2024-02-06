import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchAdvertisementAdd = createAsyncThunk<
  any,
  {
    data: any;
  },
  ThunkConfig<string>
>('AdvertisementAdd', async ({ data }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  const token = Cookies.get('token');

  try {
    const response = await axios.post<any>(`${baseUrl}/videos/create`, data, {
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (e) {
    console.log(e, 'department');
    return rejectWithValue('error');
  }
});
