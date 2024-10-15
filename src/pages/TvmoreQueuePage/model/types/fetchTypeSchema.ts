import { Monitor } from './fetchType';

export interface TvDataSchema {
  isLoading: boolean;
  error?: string;
  data?: Monitor;
}
