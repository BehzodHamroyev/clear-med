import { StateSchema } from '@/app/providers/StoreProvider';

export const getAdsDataForMonitor = (state: StateSchema) =>
  state.allAdsForOneMonitor;
export const isLoadingForMonitor = (state: StateSchema) =>
  state.allAdsForOneMonitor.isLoading;
export const errorForMonitor = (state: StateSchema) =>
  state.allAdsForOneMonitor.error;

export const connectionIdOfAds = (state: StateSchema) =>
  state.allAdsForOneMonitor.id;
