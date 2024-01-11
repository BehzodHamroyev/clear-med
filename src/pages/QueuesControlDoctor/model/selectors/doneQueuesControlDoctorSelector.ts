import { StateSchema } from '@/app/providers/StoreProvider';

export const getDoneQueuesControlDoctorData = (state: StateSchema) =>
  state.doneQueuesControlDoctor.data;

export const getDoneQueuesControlDoctorIsLoading = (state: StateSchema) =>
  state.doneQueuesControlDoctor.isLoading;

export const getDoneQueuesControlDoctorError = (state: StateSchema) =>
  state.doneQueuesControlDoctor.error;
