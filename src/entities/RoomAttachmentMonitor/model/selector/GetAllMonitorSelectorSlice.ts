import { StateSchema } from '@/app/providers/StoreProvider';

export const GetAllRoomAtachmentMonitorData = (state: StateSchema) =>
  state.GetAllRoomAtachmentMonitorSlice.data;

export const getIsLoading = (state: StateSchema) =>
  state.GetAllRoomAtachmentMonitorSlice.isLoading;

export const getIsError = (state: StateSchema) =>
  state.GetAllRoomAtachmentMonitorSlice.error;
