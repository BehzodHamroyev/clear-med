import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { useContext } from 'react';
import { baseUrl } from '../../../../../baseurl';
import { DoctorAddTypes } from '../types/doctorAddTypes';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

export const fetchDoctorAdd = createAsyncThunk<
  DoctorAddTypes,
  {
    data: any;
  },
  ThunkConfig<string>
>('DoctorAdd', async ({ data }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  const token = Cookies.get('token');

  try {
    const response = await axios.post<DoctorAddTypes>(
      `${baseUrl}/users`,
      data,
      {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      },
    );

    const {
      setHasOpenToast,
      setResponseAddDoctorStatusCode,
      setIsOpenDoctorAddCard,
    } = useContext(ButtonsContext);

    setHasOpenToast(true);
    setResponseAddDoctorStatusCode(response.status);
    setIsOpenDoctorAddCard(false);


    return response.data;
  } catch (e) {
    console.log(e, 'department');
    return rejectWithValue('error');
  }
});
