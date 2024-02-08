export interface ApiResponseAdsData {
  status: string;
  data: {
    _id: string;
    name: string;
    link: string;
    photo: string;
    disabled: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  };
}

export interface AdsData {
  isLoading?: boolean;
  isError?: boolean;
  data: {
    name?: string;
    link?: string;
    photo?: string;
  };
}
