import { StateSchema } from '@/app/providers/StoreProvider';

export const getDeparmentListData = (state: StateSchema) =>
  state.deparmentList?.data;

export const getDeparmentListIsLoading = (state: StateSchema) =>
  state.deparmentList?.isLoading;

export const getDeparmentListError = (state: StateSchema) =>
  state.deparmentList?.error;
