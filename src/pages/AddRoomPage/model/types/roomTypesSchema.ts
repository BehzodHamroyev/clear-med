import { Room } from './roomTypes';

export interface AllRoomsTypeSchema {
  isLoading?: boolean;
  error?: string;
  data?: Room[];
}
