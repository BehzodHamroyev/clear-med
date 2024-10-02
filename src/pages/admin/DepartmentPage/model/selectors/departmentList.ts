import { StateSchema } from '@/app/providers/StoreProvider';

export const getListOfDepartmens = (state: StateSchema) =>
  state.departmentPage.data;

export const getIsLoading = (state: StateSchema) =>
  state.departmentPage.isLoading;

export const getError = (state: StateSchema) => state.departmentPage.error;
