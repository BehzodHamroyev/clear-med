import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ProccesApiResponseControlPanelDoctorTypes } from '../types/controlPanelDocktorTypes';

export const fetchQueuesProccess = createAsyncThunk<
  ProccesApiResponseControlPanelDoctorTypes,
  { status: string },
  ThunkConfig<string>
>('fetchQueuesProccess', async ({ status }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  const token = localStorage.getItem('token');

  if (!status) {
    throw new Error('');
  }

  try {
    const response = await axios.get<ProccesApiResponseControlPanelDoctorTypes>(
      `https://magicsoft.uz/med/api/v1/doctor/type?status=${status}`,

      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
