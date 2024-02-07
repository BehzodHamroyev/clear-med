import { Doctor } from './doctorListTypes';

export interface AllFreeDoctorsTypeSchema {
  isLoading: boolean;
  error?: string;
  data?: Doctor[];
}
