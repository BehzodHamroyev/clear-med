import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

const baseUrl = 'https://magicsoft.uz/med/api/v1/';

export const fetchDepartmentDelete = createAsyncThunk<
  any,
  { idCard: string | number },
  ThunkConfig<string>
>('DepartmentAdd', async ({ idCard }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  const token = Cookies.get('token');

  try {
    const response = await axios.delete<any>(`${baseUrl}department/${idCard}`, {
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (e) {
    console.log(e, 'department');
    return rejectWithValue('error');
  }
});
