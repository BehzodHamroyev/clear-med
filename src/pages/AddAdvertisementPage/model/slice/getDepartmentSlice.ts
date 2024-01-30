import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { fetchAdvertisementGetAll } from '../service/getAllAdvertisementRequest';
import {
  AdvertisementListSchema,
  GetAllAdvertisement,
} from '../types/advertisementTypes';

const initialState: AdvertisementListSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const AdvertisementListSlice = createSlice({
  name: 'AdvertisementListSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvertisementGetAll.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchAdvertisementGetAll.fulfilled,
        (state, action: PayloadAction<GetAllAdvertisement>) => {
          state.isLoading = false;

          state.data = action.payload.data;
        },
      )
      .addCase(fetchAdvertisementGetAll.rejected, (state, action) => {
        state.error = `Serverda qandaydir xatolik bor. Sahifani qayta yuklang!`;
        state.isLoading = false;
      });
  },
});

export const { actions: AdvertisementListSliceActions } =
  AdvertisementListSlice;
export const { reducer: AdvertisementListSliceReducer } =
  AdvertisementListSlice;
