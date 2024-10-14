export interface Ads {
  _id: string;
  name: string;
  link: string;
  photo: string;
  disabled: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface AllAdsApiResponse {
  status: string;
  result: number;
  data: Ads[];
}
