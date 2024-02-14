import { StateSchema } from '@/app/providers/StoreProvider';

export const getInfoProject = (state: StateSchema) => state.infoProject.data;
export const isLoading = (state: StateSchema) => state.infoProject.isLoading;
export const error = (state: StateSchema) => state.infoProject.error;
