import { StateSchema } from '@/app/providers/StoreProvider';

export const getAllAdsData = (state: StateSchema) => state.allAds.data;

export const getAllAdsIsLoading = (state: StateSchema) =>
  state.allAds.isLoading;

export const getAllAdsError = (state: StateSchema) => state.allAds.error;
