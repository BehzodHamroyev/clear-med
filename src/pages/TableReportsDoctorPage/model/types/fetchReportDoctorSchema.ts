import { Queue } from './fetchReportDoctorType';

export interface ReportDoctorSchema {
  isLoading: boolean;
  error?: string;
  data?: Queue[];
}
