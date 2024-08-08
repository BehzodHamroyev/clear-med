import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { QueueApiResponseControlDoctorTypes } from '../..';
import instance from '@/shared/lib/axios/api';

export const changeDoctor = createAsyncThunk<
  QueueApiResponseControlDoctorTypes,
  { time: string; doctorId: string },
  ThunkConfig<string>
>('changeDoctor', async (prop, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  const { time, doctorId } = prop;

  try {
    const response = await instance.post<QueueApiResponseControlDoctorTypes>(
      `${baseUrl}/users/change`,
      { doctor_id: doctorId, tillTime: time },
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
