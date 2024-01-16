// import { useCookies } from 'react-cookie';

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AuthLogin } from '../types/AuthentificationTypes';

export const fetchAuthLogin = createAsyncThunk<
  AuthLogin,
  { password: string; login: number },
  ThunkConfig<string>
>('Authorization', async ({ password, login }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await axios.post(
      `${baseUrl}users/signin`,
      {
        password,
        login,
      },
      {
        // withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue('error');
  }
});
