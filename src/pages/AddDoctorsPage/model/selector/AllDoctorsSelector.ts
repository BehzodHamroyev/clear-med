import { StateSchema } from '@/app/providers/StoreProvider';

export const getAllDoctorsData = (state: StateSchema) => state.AllDoctors.data;

export const getAllDoctorsIsLoading = (state: StateSchema) =>
  state.AllDoctors.isLoading;

export const getAllDoctorsError = (state: StateSchema) =>
  state.AllDoctors.error;
