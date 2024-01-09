import { StateSchema } from '@/app/providers/StoreProvider';

export const getControlPanelDocktorData = (state: StateSchema) =>
  state.controlPanelDoctorProccess?.data;

export const getControlPanelDocktorIsLoading = (state: StateSchema) =>
  state.controlPanelDoctorProccess?.isLoading;

export const getControlPanelDocktorError = (state: StateSchema) =>
  state.controlPanelDoctorProccess?.error;
