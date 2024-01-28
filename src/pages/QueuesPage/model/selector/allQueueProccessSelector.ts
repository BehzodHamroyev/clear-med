import { StateSchema } from '@/app/providers/StoreProvider';

export const getAllQueueProccessData = (state: StateSchema) =>
  state.allQueueProccess?.data;

export const getAllQueueProccessIsLoading = (state: StateSchema) =>
  state.allQueueProccess?.isLoading;

export const getAllQueueProccessError = (state: StateSchema) =>
  state.allQueueProccess?.error;
