import { AllQueueProccessApiResponse } from './allQueueProccessTypes';

export interface AllQueueProccessSchema {
  isLoading: boolean;
  error?: string;
  data?: AllQueueProccessApiResponse;
}
