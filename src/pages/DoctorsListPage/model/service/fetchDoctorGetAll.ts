/* eslint-disable max-len */
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { DoctorListPage } from '../types/doctorListTypes';
import { ThunkConfig } from '@/app/providers/StoreProvider';

const token = Cookies.get('token');
const baseUrl = 'http://magicsoft.uz/med/api/v1/';

export const fetchDoctorGetAll = createAsyncThunk<
  DoctorListPage,
  {},
  ThunkConfig<string>
>('getAllDoctor', async (prop, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await axios.get<DoctorListPage>(
      `${baseUrl}users?role=doctor`,
      {
        headers: {
          authorization:
            `Bearer ` +
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWI4YjY1ZTU1YjBmMTZjZGRjM2RjMiIsImlhdCI6MTcwNTMxODI4OCwiZXhwIjoxNzA1Njc4Mjg4fQ.zZVoCvBN8A3LScTNKeqL1H6ceJHhkIBARBNwbLRigR8',
          'Content-Type': 'application/json',
        },
      },
    );

    console.log(response);

    return response.data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});
