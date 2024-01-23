import { StateSchema } from '@/app/providers/StoreProvider';

export const getAuthUserData = (state: StateSchema) => state.authUser?.data;

export const getAuthUserIsLoading = (state: StateSchema) =>
  state.authUser?.isLoading;

export const getAuthUserError = (state: StateSchema) => state.authUser?.error;
