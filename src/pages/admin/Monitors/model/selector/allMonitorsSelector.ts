import { StateSchema } from '@/app/providers/StoreProvider';

export const getAllMonitorsData = (state: StateSchema) =>
  state.allMonitors?.data;

export const getAllMonitorsIsLoading = (state: StateSchema) =>
  state.allMonitors?.isLoading;

export const getAllMonitorsError = (state: StateSchema) =>
  state.allMonitors?.error;
