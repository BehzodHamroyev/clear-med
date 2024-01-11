import { Queue } from './queuesControlDoctorTypes';

export interface QueuesControlDoctorSchema {
  isLoading: boolean;
  error?: string;
  data?: Queue[];
}
