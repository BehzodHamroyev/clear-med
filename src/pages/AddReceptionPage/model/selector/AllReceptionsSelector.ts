import { StateSchema } from '@/app/providers/StoreProvider';

export const getAllReceptionsData = (state: StateSchema) =>
  state.allReceptions.data;

export const getAllReceptionsIsLoading = (state: StateSchema) =>
  state.allReceptions.isLoading;

export const getAllReceptionsError = (state: StateSchema) =>
  state.allReceptions.error;
