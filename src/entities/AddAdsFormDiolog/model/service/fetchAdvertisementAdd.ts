import { createAsyncThunk } from '@reduxjs/toolkit';

import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import instance from '@/shared/lib/axios/api';

export const fetchAdvertisementAdd = createAsyncThunk<
  any,
  {
    data: any;
  },
  ThunkConfig<string>
>('AdvertisementAdd', async ({ data }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await instance.post<any>(`${baseUrl}/videos/create`, data);

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
