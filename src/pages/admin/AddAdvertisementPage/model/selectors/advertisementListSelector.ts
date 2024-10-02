import { StateSchema } from '@/app/providers/StoreProvider';

export const getListOfAdvertisement = (state: StateSchema) =>
  state.AddAdvertisementPage.data;

export const getIsLoading = (state: StateSchema) =>
  state.AddAdvertisementPage.isLoading;

export const getError = (state: StateSchema) =>
  state.AddAdvertisementPage.error;
