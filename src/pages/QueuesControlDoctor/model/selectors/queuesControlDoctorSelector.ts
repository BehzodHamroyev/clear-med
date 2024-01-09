import { StateSchema } from '@/app/providers/StoreProvider';

export const getQueuesControlDoctorData = (state: StateSchema) =>
  state.queuesControlDoctor?.data;

export const getQueuesControlDoctorIsLoading = (state: StateSchema) =>
  state.queuesControlDoctor?.isLoading;

export const getQueuesControlDoctorError = (state: StateSchema) =>
  state.queuesControlDoctor?.error;
