import React from 'react';

import { useSelector } from 'react-redux';
import { RoomAdd } from '@/entities/RoomAdd';
import { RoomEdit } from '@/entities/RoomEdit';
import { TableTitle } from '@/entities/TableTitle';
import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { fetchRoomGetAll } from '../model/service/getAllRoomRequest';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  getError,
  getIsLoading,
  getListOfRoom,
} from '../model/selectors/RoomList';

import cls from './RoomPage.module.scss';
import { RoomListSliceReducer } from '../model/slice/getRoomSlice';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { LoaderAdmin } from '@/widgets/LoaderAdmin';
import { ErrorReload } from '@/widgets/Error';

const tableTitle = ['Xona raqami', 'Bo‘limlar', 'Biriktirilgan shifokorlar'];

// const tableBody = [
//   {
//     id: 1,
//     item1: 1,
//     item2: 'Ginekologiya',
//     lastChild: 4,
//   },
//   {
//     id: 1,
//     item1: 2,
//     item2: 'Pediatriya',
//     lastChild: 3,
//   },
//   {
//     id: 1,
//     item1: 6,
//     item2: 'Ankologia',
//     lastChild: 2,
//   },
//   {
//     id: 1,
//     item1: 2,
//     item2: 'Artopediya',
//     lastChild: 1,
//   },
//   {
//     id: 1,
//     item1: 23,
//     item2: 'Ginekologiya',
//     lastChild: 2,
//   },
//   {
//     id: 1,
//     item1: 17,
//     item2: 'Ginekologiya',
//     lastChild: 3,
//   },
//   {
//     id: 1,
//     item1: 4,
//     item2: 'Pediatriya',
//     lastChild: 2,
//   },
//   {
//     id: 1,
//     item1: 6,
//     item2: 'Ankologia',
//     lastChild: 4,
//   },
//   {
//     id: 1,
//     item1: 22,
//     item2: 'Artopediya',
//     lastChild: 1,
//   },
//   {
//     id: 1,
//     item1: 23,
//     item2: 'Ginekologiya',
//     lastChild: 2,
//   },
// ];

const RoomPage = () => {
  /* useAppDispatch */
  const dispatch = useAppDispatch();

  /* useState */
  const [tableBody, setTableBody] = React.useState<any>([]);

  /* useContext  */
  const { isOpenRoomEditCard, isOpenRoomAddCard } =
    React.useContext(ButtonsContext);

  /* selectors */
  const getListOfRooms = useSelector(getListOfRoom);

  const getRoomLoadings = useSelector(getIsLoading);

  const getRoomError = useSelector(getError);

  /* useEffect */
  React.useEffect(() => {
    if (getListOfRooms) {
      const tableBodys = getListOfRooms.room.map((item: any) => {
        return {
          id: item?.id,
          item1: item?.name,
          item2: item?.department_id?.name,
          lastChild: item?.doctor_id?.name,
        };
      });
      setTableBody(() => [...tableBodys]);
    }
  }, [getListOfRooms]);

  React.useEffect(() => {
    dispatch(fetchRoomGetAll({}));
  }, [dispatch]);

  const reducer: ReducersList = {
    RoomGetAll: RoomListSliceReducer,
  };

  /* UI */
  return (
    <DynamicModuleLoader reducers={reducer}>
      {getRoomLoadings === true ? (
        <LoaderAdmin />
      ) : getRoomError ? (
        <ErrorReload message={getRoomError} />
      ) : (
        <div>
          <div className={cls.AddRoomPageWrapper}>
            <ButtonNavbar
              CreateCarbonAdd
              TableTitle="Xonalar"
              ItemsLength={tableBody.length}
            />

            <TableTitle Tablethead={tableTitle} Tabletbody={tableBody} />
          </div>

          {isOpenRoomAddCard ? <RoomAdd /> : ''}
          {isOpenRoomEditCard ? <RoomEdit /> : ''}
        </div>
      )}
    </DynamicModuleLoader>
  );
};

export default RoomPage;
