import {
  Room,
  LastQueueDataApiResponce,
  CurrentQueueDataType,
} from './departmentListTypes';

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

export interface LastQueueDataSchema {
  isLoading: boolean;
  error?: string;
  data?: LastQueueDataApiResponce;
}
