import React from 'react';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RoomAdd } from '@/entities/RoomAdd';
import { ErrorReload } from '@/widgets/Error';
import { RoomEdit } from '@/entities/RoomEdit';
import { TableTitle } from '@/entities/TableTitle';
import { LoaderAdmin } from '@/widgets/LoaderAdmin';
import { ToastHalper } from '@/shared/ui/ToastHalper';
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

  const { t } = useTranslation();

  /* useState */
  const [tableBody, setTableBody] = React.useState<any>([]);

  /* useContext  */
  const { isOpenRoomEditCard, isOpenRoomAddCard, departmentListChanged } =
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

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(fetchRoomGetAll({}));
    }, 1000);
  }, [dispatch, departmentListChanged]);

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
              TableTitle={t('Xonalar')}
              ItemsLength={tableBody.length}
            />

            <TableTitle Tablethead={tableTitle} Tabletbody={tableBody} />

            <ToastHalper />
          </div>

          {isOpenRoomAddCard ? <RoomAdd /> : ''}
          {isOpenRoomEditCard ? <RoomEdit tableBody={tableBody} /> : ''}
        </div>
      )}
    </DynamicModuleLoader>
  );
};

export default RoomPage;
