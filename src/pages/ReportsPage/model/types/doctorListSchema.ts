import { Doctor } from './doctorListTypes';

export interface DoctorListScheam {
  isLoading: boolean;
  error?: string;
  data?: Doctor[];
}
