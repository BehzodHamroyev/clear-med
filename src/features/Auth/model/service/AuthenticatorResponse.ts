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
    const response = await extra.api.post<AuthLogin>(
      `/users/login`,
      {
        password,
        login,
      },
      {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      },
    );

    // console.log(response, 'response');

    if (!response.data) {
      throw new Error();
    }
    // @ts-ignore
    if (response.data.token) {
      // @ts-ignore
      localStorage.setItem('token', response.data.token);
      // setCookie('token', response.data.token);
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
