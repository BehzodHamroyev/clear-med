/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import cls from './AddReceptionPage.module.scss';

import Toast from '@/shared/ui/Toast/Toast';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { CarbonAdd } from '@/shared/assets/entities/ButtonNavbar';
import { fetchAllReceptions } from '../model/service/fetchAllReceptions';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { DeleteTools, PenTools } from '@/shared/assets/entities/TableTitle';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  getAllReceptionsData,
  getAllReceptionsError,
  getAllReceptionsIsLoading,
} from '../model/selector/AllReceptionsSelector';

import { Loader } from '@/widgets/Loader';

import DeleteReceptionFormDialog from '../../../entities/DeleteReceptionFormDialog/DeleteReceptionFormDialog';
import EditReceptionFormDialog from '../../../entities/EditReceptionFormDialog/EditReceptionFormDialog';
import { AddReceptionFormDialog } from '@/entities/AddReceptionFormDialog';

const AddReceptionPage = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const {
    hasOpenToast,
    toastDataForAddRoomForm,

    isOpenAddReceptionCard,
    setIsOpenAddReceptionCard,

    isOpenDeleteReceptionCard,
    setIsOpenDeleteReceptionCard,

    isOpenEditReceptionCard,
    setIsOpenEditReceptionCard,
  } = useContext(ButtonsContext);

  const allReceptionsData = useSelector(getAllReceptionsData);
  const allReceptionsError = useSelector(getAllReceptionsError);
  const allReceptionsIsLoading = useSelector(getAllReceptionsIsLoading);

  const [deleteReceptionId, setDeleteReceptionId] = useState<string>();
  const [editReceptionId, setEditReceptionId] = useState<string>();

  const handleCardAddCard = () => {
    setIsOpenAddReceptionCard(true);
  };

  useEffect(() => {
    dispatch(fetchAllReceptions({}));
  }, [dispatch]);

  const handleClickDeleteDoctor = (id: string) => {
    setIsOpenDeleteReceptionCard(true);

    setDeleteReceptionId(id);
  };

  const handleClickEditDoctor = (id: string) => {
    setIsOpenEditReceptionCard(true);

    setEditReceptionId(id);
  };

  return (
    <div className={cls.AddDoctorPageWrp}>
      <div className={cls.AddDoctorPageWrp__Title}>
        <p className={cls['AddDoctorPageWrp__Title--text']}>
          {/* {t('Receptions')} */}
          {t("Qabul xona xodimini qo'shish")}{' '}
          <span className={cls['AddDoctorPageWrp__Title--span']}>
            ({allReceptionsData ? allReceptionsData.length : 0})
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

        {allReceptionsData && allReceptionsData.length > 0 && (
          <tbody className={cls['AddDoctorPageWrp__Table--Tabletbody']}>
            {allReceptionsData.map((item) => {
              const ImgSvg = `http://socketmed.magicsoft.uz//${item.photo}`;

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
                    {item?.name ? item?.name : "Ism yo'q"}
                  </td>

                  <td className={cls['AddDoctorPageWrp__Table--td']}>
                    {item?.exprience ? item?.exprience : '-'}
                  </td>

                  <td className={cls['AddDoctorPageWrp__Table--td']}>
                    {item?.login ? (
                      <span>
                        ({item?.login.toString().substring(0, 2)}){' '}
                        {item?.login.toString().substring(2, 5)}{' '}
                        {item?.login.toString().substring(5, 7)}{' '}
                        {item?.login.toString().substring(7, 9)}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>

                  <td
                    className={cls['AddDoctorPageWrp__Table--lastChild']}
                    onClick={() => handleClickEditDoctor(item?.id)}
                  >
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
      </table>

      {isOpenAddReceptionCard && <AddReceptionFormDialog />}

      {editReceptionId && isOpenEditReceptionCard && (
        <EditReceptionFormDialog receptionId={editReceptionId} />
      )}

      {deleteReceptionId && isOpenDeleteReceptionCard && (
        <DeleteReceptionFormDialog receptionId={deleteReceptionId} />
      )}

      {hasOpenToast && (
        <Toast
          message={toastDataForAddRoomForm?.toastMessageForAddRoomForm}
          severity={toastDataForAddRoomForm?.toastSeverityForAddRoomForm}
        />
      )}

      {allReceptionsIsLoading && <Loader />}

      {allReceptionsError && <ErrorDialog isErrorProps={!false} />}
    </div>
  );
};

export default AddReceptionPage;
