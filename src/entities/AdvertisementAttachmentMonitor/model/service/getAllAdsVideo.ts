import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddsVideosDataBackend } from '../types/addsTypes';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import instance from '@/shared/lib/axios/api';

export const getAllAdsVideo = createAsyncThunk<
  AddsVideosDataBackend,
  {},
  ThunkConfig<string>
>('getAllAdd', async (prop, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await instance.get(`/videos/all`);
    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
