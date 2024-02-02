import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AllRoomsApiResponse } from '../types/roomTypes';

export const fetchAllRooms = createAsyncThunk<
  AllRoomsApiResponse,
  {},
  ThunkConfig<string>
  // eslint-disable-next-line no-empty-pattern
>('fetchAllRoom', async ({}, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const response = await axios.get<AllRoomsApiResponse>(
      `${baseUrl}/room/all`,
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
