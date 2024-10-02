import { StateSchema } from '@/app/providers/StoreProvider';

export const getListOfDoctor = (state: StateSchema) =>
  state.getDoctorPageReducer.data;

export const getIsLoading = (state: StateSchema) =>
  state.getDoctorPageReducer.isLoading;

export const getError = (state: StateSchema) =>
  state.getDoctorPageReducer.error;
