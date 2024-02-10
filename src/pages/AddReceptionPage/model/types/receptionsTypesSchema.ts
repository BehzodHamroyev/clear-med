import { Reception } from './receptoinsListTypes';

export interface AllReceptionsTypeSchema {
  isLoading: boolean;
  error?: string;
  data?: Reception[];
}
