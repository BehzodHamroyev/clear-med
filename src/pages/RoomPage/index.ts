export { default as RoomPage } from './ui/RoomPage';

export type { GetAllRoom } from './model/types/RoomTypes';

export { RoomListSliceReducer } from './model/slice/getRoomSlice';

export type { RoomListSchema } from './model/types/RoomTypes';

export { fetchRoomGetAll } from './model/service/getAllRoomRequest';

export { getListOfRoom } from './model/selectors/RoomList';
