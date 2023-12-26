import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AuthLogin } from '../types/AuthentificationTypes';

export const fetchAuthLogin = createAsyncThunk<
  AuthLogin,
  { password: string; login: string },
  ThunkConfig<string>
>('Authorization', async ({ password, login }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    console.log('response');
    const response = await extra.api.post<AuthLogin>(`/users/login`, {
      password,
      login,
    });

    console.log(response, 'response');

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
