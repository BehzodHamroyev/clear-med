import { StateSchema } from '@/app/providers/StoreProvider';

export const getAllDepartmentsData = (state: StateSchema) =>
  state.allDepartments.data;

export const getAllDepartmentsIsLoading = (state: StateSchema) =>
  state.allDepartments.isLoading;

export const getAllDepartmentsError = (state: StateSchema) =>
  state.allDepartments.error;
