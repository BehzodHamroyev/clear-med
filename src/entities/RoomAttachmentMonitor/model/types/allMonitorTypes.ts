export interface TypesOfRoomsAttachedToTheMonitor {
  Monitor: {
    addvertising: boolean;
    createdAt: string;
    disabled: false;
    id: string;
    monitor: string;
    name: string;
    rooms: [];
    updatedAt: string;
    videos: [];
    __v: number;
    _id: string;
  };
}

export interface MonitorRoomData {
  config: any;
  headers: any;
  request: any;
  status: number;
  statusText: string;
  data: TypesOfRoomsAttachedToTheMonitor;
}

export interface MonitorRoomListSchema {
  isLoading: boolean;
  error?: string;
  data?: TypesOfRoomsAttachedToTheMonitor;
}
