import { StateSchema } from '@/app/providers/StoreProvider';

export const getreportControlDoctorData = (state: StateSchema) =>
  state.reportControlDoctor.data;

export const getreportControlDoctorIsLoading = (state: StateSchema) =>
  state.reportControlDoctor.isLoading;

export const getreportControlDoctorError = (state: StateSchema) =>
  state.reportControlDoctor.error;
