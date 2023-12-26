import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { TableInfoPatients } from '../types/TableInfo';

export const fetchTableReports = createAsyncThunk<
  TableInfoPatients,
  { id: string },
  ThunkConfig<string>
>('TableResponse', async ({ id }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.get<TableInfoPatients>(
      `/users/doctor/ill/procces${id}`,
    );

    console.log(response, 'response');

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
