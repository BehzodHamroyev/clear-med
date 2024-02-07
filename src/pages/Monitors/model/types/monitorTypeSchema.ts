import { Monitor } from './monitorTypes';

export interface AllMonitorsTypeSchema {
  isLoading?: boolean;
  error?: string;
  data?: Monitor[];
}
