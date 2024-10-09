import { createAsyncThunk } from '@reduxjs/toolkit';

import { useContext } from 'react';
import { baseUrl } from '../../../../../baseurl';
import { DoctorAddTypes } from '../types/doctorAddTypes';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import instance from '@/shared/lib/axios/api';

export const fetchDoctorAdd = createAsyncThunk<
  DoctorAddTypes,
  {
    data: any;
  },
  ThunkConfig<string>
>('DoctorAdd', async ({ data }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await instance.post<DoctorAddTypes>(
      `${baseUrl}/users`,
      data,
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
    return rejectWithValue('error');
  }
});
