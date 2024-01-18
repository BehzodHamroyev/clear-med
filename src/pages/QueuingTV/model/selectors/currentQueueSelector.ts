import { StateSchema } from '@/app/providers/StoreProvider';

export const getCurrentQueueData = (state: StateSchema) =>
  state.currentQueue?.data;

export const getCurrentQueueIsLoading = (state: StateSchema) =>
  state.currentQueue?.isLoading;

export const getCurrentQueueError = (state: StateSchema) =>
  state.currentQueue?.error;
