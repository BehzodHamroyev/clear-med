import { Ads } from './adsTypes';

export interface AllAdsTypeSchema {
  isLoading?: boolean;
  error?: string;
  data?: Ads[];
}
