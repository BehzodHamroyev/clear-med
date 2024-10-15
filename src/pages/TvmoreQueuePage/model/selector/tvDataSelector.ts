import { StateSchema } from '@/app/providers/StoreProvider';

export const getTvData = (state: StateSchema) => state.TvData.data;

export const getTvDataIsLoading = (state: StateSchema) =>
  state.TvData.isLoading;

export const getTvDataError = (state: StateSchema) => state.TvData.error;
