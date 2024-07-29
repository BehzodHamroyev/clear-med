import { StateSchema } from '@/app/providers/StoreProvider';

export const getAdsData = (state: StateSchema) => state.allAdsVideo.data;
export const isLoading = (state: StateSchema) => state.allAdsVideo.isLoading;
export const error = (state: StateSchema) => state.allAdsVideo.error;
