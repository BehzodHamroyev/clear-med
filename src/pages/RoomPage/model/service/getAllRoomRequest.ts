import { createAsyncThunk } from '@reduxjs/toolkit';

import { GetAllRoom } from '../types/RoomTypes';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchRoomGetAll = createAsyncThunk<
  GetAllRoom,
  {},
  ThunkConfig<string>
>('getAllRoom', async (prop, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<GetAllRoom>('/room/all');

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
