export interface GetAllAdvertisementData {
  _id: string;
  name: string;
  link: string;
  photo: string;
  disabled: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface GetAllAdvertisement {
  status: string;
  result: number;
  data: GetAllAdvertisementData[];
}

export interface AdvertisementListSchema {
  isLoading: boolean;
  error?: string;
  data?: GetAllAdvertisementData[];
}

export interface ResponseOfBacend {
  data?: GetAllAdvertisement[];
}
