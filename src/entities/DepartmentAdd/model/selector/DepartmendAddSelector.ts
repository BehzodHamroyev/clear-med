import { StateSchema } from '@/app/providers/StoreProvider';

export const getDepartment = (state: StateSchema) => state.departmentAdd.data;

export const getIsLoading = (state: StateSchema) =>
  state.departmentAdd.isLoading;

export const getError = (state: StateSchema) => state.departmentAdd;
