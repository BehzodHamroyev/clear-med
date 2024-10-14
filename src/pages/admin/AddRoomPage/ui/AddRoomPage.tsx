import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { FaPen } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import cls from './AddRoomPage.module.scss';


import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { fetchAllRooms } from '../model/services/fetchAllRooms';
import {
  getAllRoomsData,
  getAllRoomsError,
  getAllRoomsIsLoading,
} from '../model/selector/allRoomSelector';

import { Room } from '../model/types/roomTypes';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import AddRoomFormDialog from '@/entities/AddRoomFormDialog/ui/AddRoomFormDialog';
import EditRoomFormDialog from '@/entities/EditRoomFormDialog/EditRoomFormDialog';
import DeleteRoomFormDialog from '@/entities/DeleteRoomFormDialog/DeleteRoomFormDialog';
import Toast from '@/shared/ui/Toast/Toast';
import Loader from '@/widgets/Loader/ui/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';


interface AddRoomPageProps {
  className?: string;
}

const AddRoomPage = ({ className }: AddRoomPageProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [editRoomId, setEditRoomId] = useState<string>();

  const {
    hasOpenToast,
    isOpenRoomAddCard,
    setIsOpenRoomAddCard,
    isOpenRoomEditCard,
    setIsOpenRoomEditCard,
    isOpenRoomDeleteCard,
    setIsOpenRoomDeleteCard,
    toastDataForAddRoomForm,
  } = useContext(ButtonsContext);

  const allRoomsData = useSelector(getAllRoomsData);
  const allRoomsIsLoading = useSelector(getAllRoomsIsLoading);
  const allRoomsError = useSelector(getAllRoomsError);

  useEffect(() => {
    dispatch(fetchAllRooms({}));
  }, [dispatch]);

  const handleClickOpenCard = () => {
    setIsOpenRoomAddCard(true);
  };

  const handeClickEditRoom = (id: string) => {
    setEditRoomId('');

    if (id) {
      setEditRoomId(id);
    }

    setIsOpenRoomEditCard(true);
  };

  const handleClickDeleteRoom = (id: string) => {
    setEditRoomId('');

    if (id) {
      setEditRoomId(id);
    }

    setIsOpenRoomDeleteCard(true);
  };

  return (
    <div className={classNames(cls.addRoomPage, {}, [className])}>
      <div className={classNames(cls.addRoomPage__header)}>
        <div className={classNames(cls['addRoomPage__header--left'])}>
          <p>{t('Xonalar')}</p>
          <span>({allRoomsData?.length})</span>
        </div>

        <div
          className={classNames(cls['addRoomPage__header--right'])}
          onClick={handleClickOpenCard}
        >
          <p>+</p>
        </div>
      </div>

      {allRoomsData && allRoomsData.length > 0 ? (
        <div className={classNames(cls.addRoomPage__table)}>
          <table>
            <thead>
              <tr>
                <th>{t('Xona raqami')}</th>
                <th>{t("Biriktirilgan bo'lim")}</th>
                <th>{t('Biriktirilgan shifokorlar')}</th>
                <th>{}</th>
                <th>{}</th>
              </tr>
            </thead>
            <tbody>
              {allRoomsData.map((item: Room) => (
                <tr key={item?.id}>
                  <td>{item?.name}</td>
                  <td>
                    {item?.department_id?.name ? (
                      item?.department_id?.name
                    ) : (
                      <span className={classNames(cls.tdAmpty)}>
                        {t("Bo'lim yo'q")}
                      </span>
                    )}
                  </td>
                  <td>
                    {item?.doctor_id!.length > 0 ? (
                      item?.doctor_id?.map((doctor) => {
                        return (
                          <p style={{ margin: '5px', textAlign: 'start' }}>
                            Shifokor: {doctor.name}
                          </p>
                        );
                      })
                    ) : (
                      <span className={classNames(cls.tdAmpty)}>
                        {t("Shifokor yo'q")}
                      </span>
                    )}
                  </td>
                  <td
                    className={classNames(cls.tablePenRow)}
                    onClick={() => handeClickEditRoom(item?.id)}
                  >
                    {}
                    <FaPen className={classNames(cls.tablePen)} />
                  </td>
                  <td
                    className={classNames(cls.tableDeleteRow)}
                    onClick={() => handleClickDeleteRoom(item?.id)}
                  >
                    {}
                    <MdDelete className={classNames(cls.tableDelete)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !allRoomsIsLoading ? (
        <h1>{t('Xonalar mavjud emas')}</h1>
      ) : (
        ''
      )}

      {isOpenRoomAddCard && <AddRoomFormDialog />}

      {editRoomId && isOpenRoomEditCard && (
        <EditRoomFormDialog roomId={editRoomId} />
      )}

      {editRoomId && isOpenRoomDeleteCard && (
        <DeleteRoomFormDialog roomId={editRoomId} />
      )}

      {hasOpenToast && (
        <Toast
          severity={toastDataForAddRoomForm?.toastSeverityForAddRoomForm}
          message={toastDataForAddRoomForm?.toastMessageForAddRoomForm}
        />
      )}

      {allRoomsIsLoading && <Loader />}

      {allRoomsError && <ErrorDialog isErrorProps={!false} />}
    </div>
  );
};

export default AddRoomPage;
