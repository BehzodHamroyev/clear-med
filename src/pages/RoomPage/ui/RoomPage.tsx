import React from 'react';

import { useSelector } from 'react-redux';
import Toast from '@/shared/ui/Toast/Toast';
import { RoomAdd } from '@/entities/RoomAdd';
import { ErrorReload } from '@/widgets/Error';
import { RoomEdit } from '@/entities/RoomEdit';
import { TableTitle } from '@/entities/TableTitle';
import { LoaderAdmin } from '@/widgets/LoaderAdmin';
import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { RoomListSliceReducer } from '../model/slice/getRoomSlice';
import { fetchRoomGetAll } from '../model/service/getAllRoomRequest';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  getError,
  getIsLoading,
  getListOfRoom,
} from '../model/selectors/RoomList';

import {
  ReducersList,
  DynamicModuleLoader,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import cls from './RoomPage.module.scss';

const tableTitle = ['Xona raqami', 'Bo‘limlar', 'Biriktirilgan shifokorlar'];

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

            <Toast severity="success" message="Xona qo'shildi" />
          </div>

          {isOpenRoomAddCard ? <RoomAdd /> : ''}
          {isOpenRoomEditCard ? <RoomEdit tableBody={tableBody} /> : ''}
        </div>
      )}
    </DynamicModuleLoader>
  );
};

export default RoomPage;
