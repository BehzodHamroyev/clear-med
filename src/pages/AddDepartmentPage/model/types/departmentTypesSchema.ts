import { Department } from './departmentTypes';

export interface AllDepartmentTypeSchema {
  isLoading: boolean;
  error?: string;
  data?: Department[];
}
