import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { QueueApiResponseControlDoctorTypes } from '../..';

export const fetchQueuesControlDoctor = createAsyncThunk<
  QueueApiResponseControlDoctorTypes,
  { doctorId: string; status: string },
  ThunkConfig<string>
>('readingArabic', async ({ doctorId, status = 'pending' }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  if (!doctorId) {
    throw new Error('');
  }

  try {
    const response = await axios.get<QueueApiResponseControlDoctorTypes>(
      `https://magicsoft.uz/med/api/v1/doctor/type?status=${status}`,

      {
        headers: {
          authorization:
            // eslint-disable-next-line max-len
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWI4YmFkZTU1YjBmMTZjZGRjM2RjZCIsImlhdCI6MTcwNDc2NzcwMiwiZXhwIjoxNzA0ODAzNzAyfQ.y1nEvZwU5N4X_7GezUVgn3HUtCYeats-cgOIjwT4FVQ',
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
