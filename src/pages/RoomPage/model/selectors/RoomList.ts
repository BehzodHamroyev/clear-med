import { StateSchema } from '@/app/providers/StoreProvider';

export const getListOfRoom = (state: StateSchema) => state.RoomGetAll.data;

export const getIsLoading = (state: StateSchema) => state.RoomGetAll.isLoading;

export const getError = (state: StateSchema) => state.RoomGetAll.error;
