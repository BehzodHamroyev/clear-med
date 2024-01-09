import { QueueApiResponseControlDoctorTypes } from './queuesControlDoctorTypes';

export interface QueuesControlDoctorSchema {
  isLoading: boolean;
  error?: string;
  data?: QueueApiResponseControlDoctorTypes;
}
