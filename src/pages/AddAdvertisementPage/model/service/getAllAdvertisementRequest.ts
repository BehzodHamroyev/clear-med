import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { GetAllAdvertisement } from '../types/advertisementTypes';

export const fetchAdvertisementGetAll = createAsyncThunk<
  GetAllAdvertisement,
  {},
  ThunkConfig<string>
>('getAllDepartment', async (prop, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get('videos/all');

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
