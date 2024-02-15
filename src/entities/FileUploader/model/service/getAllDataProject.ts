import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import instance from '@/shared/lib/axios/api';
import { InfoProjectFromBackend } from '../types/typeInfoProject';

export const getAllDataProject = createAsyncThunk<
  InfoProjectFromBackend,
  {},
  ThunkConfig<string>
>('getAllDataProject', async (prop, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const response = await instance.get<InfoProjectFromBackend>(`about/all`);

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
