import { CurrentQueueDataType, Room } from './departmentListTypes';

export interface DepartmentListSchemaForReception {
  isLoading: boolean;
  error?: string;
  data?: Room[];
}

export interface CurrentQueueSchemaForReception {
  isLoading: boolean;
  error?: string;
  data?: CurrentQueueDataType;
}
