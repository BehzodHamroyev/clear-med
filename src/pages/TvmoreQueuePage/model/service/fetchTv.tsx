import { createAsyncThunk } from '@reduxjs/toolkit';

import instance from '@/shared/lib/axios/api';
import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchTv = createAsyncThunk<any, {}, ThunkConfig<string>>(
  'fetchTv',
  async ({ }, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const response = await instance.get<any>(
        `${baseUrl}/monitor/proceed/tv`,
      );

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  },
);
