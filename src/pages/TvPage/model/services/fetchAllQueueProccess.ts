import { createAsyncThunk } from '@reduxjs/toolkit';

import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AllQueueProccessApiResponse } from '../types/allQueueProccessTypes';
import instance from '@/shared/lib/axios/api';

export const fetchAllQueueProccess = createAsyncThunk<
  AllQueueProccessApiResponse,
  { monitorId?: string },
  ThunkConfig<string>
>('fetchAllQueueProccess', async ({ monitorId }, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  if (monitorId) {
    try {
      const response = await instance.get(
        `${baseUrl}/monitor/proceed/${monitorId}`,
      );

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  } else {
    try {
      const response = await instance.get(`${baseUrl}/monitor/proceed`, {});

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  }
});
