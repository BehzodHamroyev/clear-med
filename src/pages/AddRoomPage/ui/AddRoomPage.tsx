import React, { useEffect } from 'react';
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
import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { Room } from '../model/types/roomTypes';

interface AddRoomPageProps {
  className?: string;
}

const AddRoomPage = ({ className }: AddRoomPageProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const allRoomsData = useSelector(getAllRoomsData);
  const allRoomsIsLoading = useSelector(getAllRoomsIsLoading);
  const allRoomsError = useSelector(getAllRoomsError);

  useEffect(() => {
    dispatch(fetchAllRooms({}));
  }, [dispatch]);

  return (
    <div className={classNames(cls.addRoomPage, {}, [className])}>
      <div className={classNames(cls.addRoomPage__header)}>
        <div className={classNames(cls['addRoomPage__header--left'])}>
          <p>{t('Xonalar')}:</p>
          <span>{10}</span>
        </div>

        <div className={classNames(cls['addRoomPage__header--right'])}>
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
                  <td>{item?.department_id?.name}</td>
                  <td>{item?.doctor_id?.name}</td>
                  <td className={classNames(cls.tablePenRow)}>
                    {}
                    <FaPen className={classNames(cls.tablePen)} />
                  </td>
                  <td className={classNames(cls.tableDeleteRow)}>
                    {}
                    <MdDelete className={classNames(cls.tableDelete)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>{t('Xonalar mavjud emas')}</h1>
      )}

      {allRoomsIsLoading && <Loader />}

      {allRoomsError && <ErrorDialog isErrorProps={!false} />}
    </div>
  );
};

export default AddRoomPage;
