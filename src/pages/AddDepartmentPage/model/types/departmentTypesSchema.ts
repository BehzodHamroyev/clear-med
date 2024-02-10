import { Department } from './departmentTypes';

export interface AllDepartmentTypeSchema {
  isLoading: boolean;
  error?: boolean | string;
  data?: Department[];
}
