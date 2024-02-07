import { StateSchema } from '@/app/providers/StoreProvider';

export const getAllRoomsData = (state: StateSchema) => state.allRooms?.data;

export const getAllRoomsIsLoading = (state: StateSchema) =>
  state.allRooms?.isLoading;

export const getAllRoomsError = (state: StateSchema) => state.allRooms?.error;
