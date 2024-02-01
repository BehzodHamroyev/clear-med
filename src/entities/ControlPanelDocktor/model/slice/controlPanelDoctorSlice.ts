import { PayloadAction } from '@reduxjs/toolkit';
import { fetchQueuesProccess } from '../services/fetchQueuesProccess';
import { ProccessControlPanelDoctorSchema } from '../types/controlPanelDocktorSchema';
import {
  ProccesApiResponseControlPanelDoctorTypes,
  Queue,
} from '../types/controlPanelDocktorTypes';
import { buildSlice } from '@/shared/lib/store';

const initialState: ProccessControlPanelDoctorSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const controlPanelDoctorSlice = buildSlice({
  name: 'Proccess Control Doctor ',
  initialState,
  reducers: {
    equalProccedQueue: (state, { payload }: PayloadAction<Queue>) => {
      if (state.data && state.data.data) {
        state.data = {
          result: 1,
          status: 'succes',
          data: [payload],
        };
      }
    },

    clearProccedQueue: (state) => {
      state.data = {
        result: 0,
        status: '',
        data: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueuesProccess.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchQueuesProccess.fulfilled,
        (
          state,
          action: PayloadAction<ProccesApiResponseControlPanelDoctorTypes>,
        ) => {
          state.isLoading = false;

          if (action.payload.data[0]?.status === 'proccessed') {
            state.data = action.payload;
          } else {
            state.data = {
              result: 0,
              status: '',
              data: [],
            };
          }
        },
      )
      .addCase(fetchQueuesProccess.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: controlPanelDoctorActions } = controlPanelDoctorSlice;
export const { reducer: controlPanelDoctorReducer } = controlPanelDoctorSlice;
export const { useActions: useQueuesControlPanelDoctorActions } =
  controlPanelDoctorSlice;
