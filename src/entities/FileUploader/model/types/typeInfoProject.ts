export interface Info {
  _id: string;
  name: string;
  summary: string;
  logo: string;
  disabled: false;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface InfoProjectFromBackend {
  status: string;
  result: number;
  data: Info[];
}

export interface InfoProjectRedux {
  isLoading?: boolean;
  error?: string;
  data?: Info[];
}
