import { Room } from './departmentListTypes';

export interface DepartmentListSchemaForReception {
  isLoading: boolean;
  error?: string;
  data?: Room[];
}
