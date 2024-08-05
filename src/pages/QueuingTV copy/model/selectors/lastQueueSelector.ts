import { StateSchema } from '@/app/providers/StoreProvider';

export const getLastQueueData = (state: StateSchema) => state.lastQueue?.data;

export const getLastQueueIsLoading = (state: StateSchema) =>
  state.lastQueue?.isLoading;

export const getLastQueueError = (state: StateSchema) => state.lastQueue?.error;
