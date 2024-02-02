import { Doctor } from './doctorListTypes';

export interface AllDoctorsTypeSchema {
  isLoading: boolean;
  error?: string;
  data?: Doctor[];
}
