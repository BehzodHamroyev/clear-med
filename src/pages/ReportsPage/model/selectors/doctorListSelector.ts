import { StateSchema } from '@/app/providers/StoreProvider';

export const getDoctorListData = (state: StateSchema) => state.doctorList?.data;

export const getDoctorListIsLoading = (state: StateSchema) =>
  state.doctorList?.isLoading;

export const getDoctorListError = (state: StateSchema) =>
  state.doctorList?.error;
