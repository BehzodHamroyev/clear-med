import { ProccesApiResponseControlPanelDoctorTypes } from './controlPanelDocktorTypes';

export interface ProccessControlPanelDoctorSchema {
  isLoading: boolean;
  error?: string;
  data?: ProccesApiResponseControlPanelDoctorTypes;
}
