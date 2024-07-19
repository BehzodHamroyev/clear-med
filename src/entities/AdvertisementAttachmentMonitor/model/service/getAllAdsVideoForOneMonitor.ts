import { createAsyncThunk } from '@reduxjs/toolkit';
import { MonitorAdsBackend } from '../types/addsTypes';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import instance from '@/shared/lib/axios/api';

export const getAllAdsVideoForOneMonitor = createAsyncThunk<
  MonitorAdsBackend,
  { id: string },
  ThunkConfig<string>
>('getAllAdsVideoForOneMonitor', async (prop, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  const { id } = prop;
  try {
    const response = await instance.get(`/monitor/user/${id}`);
    return response.data;
  } catch (e) {
    // console.log(e, 'department');
    return rejectWithValue('error');
  }
});
