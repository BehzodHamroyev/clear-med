import { QueueProccessInRedux } from './allQueueProccessTypes';

export interface AllQueueProccessSchema {
  isLoading: boolean;
  error?: string;
  data?: QueueProccessInRedux;
}
