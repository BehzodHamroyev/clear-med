import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { CurrentQueueDataApiRespoceType } from '../types/departmentListTypes';

export const fetchCurrentQueue = createAsyncThunk<
  CurrentQueueDataApiRespoceType,
  { departmentId: string; roomId: string },
  ThunkConfig<string>
>('fetchCurrentQueue', async ({ departmentId, roomId }, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  const socket = io('http://socketmed.magicsoft.uz');

  const getTokenCookie = Cookies.get('token');

  try {
    const response = await axios.post(
      `${baseUrl}/queue/create`,
      {
        department_id: departmentId,
        room_id: roomId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${getTokenCookie}`,
        },
      },
    );

    if (response.data) {
      socket.emit(
        'create_queue',
        { queue_data: response.data },
        (responce: { status: string }) => {
          console.log(responce);
        },
      );
    }

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
