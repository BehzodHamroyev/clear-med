/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import cls from './AddDoctorPage.module.scss';

import Toast from '@/shared/ui/Toast/Toast';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { CarbonAdd } from '@/shared/assets/entities/ButtonNavbar';
import { fetchAllDoctors } from '../model/service/fetchAllDoctors';
import { AddDoctorFormDialog } from '@/entities/AddDoctorFormDialog';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { DeleteTools, PenTools } from '@/shared/assets/entities/TableTitle';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  getAllDoctorsData,
  getAllDoctorsError,
  getAllDoctorsIsLoading,
} from '../model/selector/AllDoctorsSelector';

import DeleteDoctorFormDialog from '../../../entities/DeleteDoctorFormDialog/DeleteDoctorFormDialog';
import { Loader } from '@/widgets/Loader';

const AddDoctorPage = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const {
    hasOpenToast,
    isOpenDoctorAddCard,
    isOpenDoctorDeleteCard,
    setIsOpenDoctorAddCard,
    toastDataForAddRoomForm,
    setIsOpenDoctorDeleteCard,
  } = useContext(ButtonsContext);

  const allDoctorsData = useSelector(getAllDoctorsData);
  const allDoctorsError = useSelector(getAllDoctorsError);
  const allDoctorsIsLoading = useSelector(getAllDoctorsIsLoading);

  const [deleteDoctorId, setDeleteDoctorId] = useState<string>();

  const handleCardAddCard = () => {
    setIsOpenDoctorAddCard(true);
  };

  useEffect(() => {
    dispatch(fetchAllDoctors({}));
  }, [dispatch]);

  const handleClickDeleteDoctor = (id: string) => {
    setIsOpenDoctorDeleteCard(true);

    setDeleteDoctorId(id);
  };

  return (
    <div className={cls.AddDoctorPageWrp}>
      <div className={cls.AddDoctorPageWrp__Title}>
        <p className={cls['AddDoctorPageWrp__Title--text']}>
          {t('Shifokorlar')}{' '}
          <span className={cls['AddDoctorPageWrp__Title--span']}>
            ({allDoctorsData ? allDoctorsData.length : 0})
          </span>{' '}
        </p>

        <div className={cls['AddDoctorPageWrp__Title--IconDiv']}>
          <CarbonAdd
            onClick={handleCardAddCard}
            className={cls['AddDoctorPageWrp__Title--Icon']}
          />
        </div>
      </div>

      <table className={cls.AddDoctorPageWrp__Table}>
        <thead className={cls['AddDoctorPageWrp__Table--Tablethead']}>
          <tr className={cls['AddDoctorPageWrp__Table--tr']}>
            <th className={cls['AddDoctorPageWrp__Table--th']}>{t('Surat')}</th>

            <th className={cls['AddDoctorPageWrp__Table--th']}>
              {t('F.I.Sh')}
            </th>

            <th className={cls['AddDoctorPageWrp__Table--th']}>{t('Xona')}</th>

            <th className={cls['AddDoctorPageWrp__Table--th']}>
              {t('Bo’lim')}
            </th>

            <th className={cls['AddDoctorPageWrp__Table--th']}>
              {t('Tajribasi')}
            </th>

            <th className={cls['AddDoctorPageWrp__Table--th']}>
              {t('Telefon raqami')}
            </th>

            <th className={cls['AddDoctorPageWrp__Table--edit']} />
            <th className={cls['AddDoctorPageWrp__Table--delete']} />
          </tr>
        </thead>

        {allDoctorsData && allDoctorsData.length > 0 && (
          <tbody className={cls['AddDoctorPageWrp__Table--Tabletbody']}>
            {allDoctorsData.map((item) => {
              const ImgSvg = `http://medapi.magicsoft.uz/${item.photo}`;

              return (
                <tr
                  key={item.id}
                  className={cls['AddDoctorPageWrp__Table--tr']}
                >
                  <td className={cls['AddDoctorPageWrp__Table--td']}>
                    <img
                      src={ImgSvg}
                      className={cls['AddDoctorPageWrp__Table--img']}
                      alt=""
                    />
                  </td>

                  <td className={cls['AddDoctorPageWrp__Table--td']}>
                    {item?.name ? item?.name : '-'}
                  </td>

                  <td className={cls['AddDoctorPageWrp__Table--td']}>
                    {item?.rooms?.[0]?.name ? item?.rooms?.[0]?.name : '-'}
                  </td>

                  <td className={cls['AddDoctorPageWrp__Table--td']}>
                    {item?.rooms?.[0]?.department_id?.name
                      ? item?.rooms?.[0]?.department_id?.name
                      : '-'}
                  </td>

                  <td className={cls['AddDoctorPageWrp__Table--td']}>
                    {item?.exprience ? item?.exprience : '-'}
                  </td>

                  <td className={cls['AddDoctorPageWrp__Table--td']}>
                    {item?.login ? item?.login : '-'}
                  </td>

                  <td className={cls['AddDoctorPageWrp__Table--lastChild']}>
                    {}
                    <PenTools
                      className={cls['AddDoctorPageWrp__Table--edit']}
                    />
                  </td>

                  <td
                    className={cls['AddDoctorPageWrp__Table--lastChild2']}
                    onClick={() => handleClickDeleteDoctor(item?.id)}
                  >
                    {}
                    <DeleteTools
                      className={cls['AddDoctorPageWrp__Table--delete']}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}

        {allDoctorsIsLoading && <Loader />}
        {allDoctorsError && <ErrorDialog isErrorProps={!false} />}
      </table>

      {deleteDoctorId && isOpenDoctorDeleteCard && (
        <DeleteDoctorFormDialog doctorId={deleteDoctorId} />
      )}

      {hasOpenToast && (
        <Toast
          message={toastDataForAddRoomForm?.toastMessageForAddRoomForm}
          severity={toastDataForAddRoomForm?.toastSeverityForAddRoomForm}
        />
      )}

      {isOpenDoctorAddCard ? <AddDoctorFormDialog /> : ''}
    </div>
  );
};

export default AddDoctorPage;
