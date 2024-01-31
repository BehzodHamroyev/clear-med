import { StateSchema } from '@/app/providers/StoreProvider';

export const GetAllMonitorPageData = (state: StateSchema) =>
  state.GetAllMonitorPage.data;

export const getIsLoading = (state: StateSchema) =>
  state.GetAllMonitorPage.isLoading;

export const getError = (state: StateSchema) => state.GetAllMonitorPage.error;
