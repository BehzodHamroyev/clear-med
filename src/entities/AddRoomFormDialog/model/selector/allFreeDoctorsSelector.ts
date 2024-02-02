import { StateSchema } from '@/app/providers/StoreProvider';

export const getAllFreeDoctorsData = (state: StateSchema) =>
  state.allFreeDoctors.data;

export const getAllFreeDoctorsIsLoading = (state: StateSchema) =>
  state.allFreeDoctors.isLoading;

export const getAllFreeDoctorsError = (state: StateSchema) =>
  state.allFreeDoctors.error;
