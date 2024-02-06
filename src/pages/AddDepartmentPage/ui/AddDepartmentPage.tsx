/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import cls from './AddDepartmentPage.module.scss';

import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { CarbonAdd } from '@/shared/assets/entities/ButtonNavbar';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { fetchAllDepartments } from '../model/service/fetchAllDepartments';
import { DeleteTools, PenTools } from '@/shared/assets/entities/TableTitle';
import { AddDepartmentFormDialog } from '@/entities/AddDepartmentFormDialog';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  getAllDepartmentsData,
  getAllDepartmentsError,
  getAllDepartmentsIsLoading,
} from '../model/selector/AllDepartmentSelector';
import Toast from '@/shared/ui/Toast/Toast';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import DeleteDepartmentFormDialog from '@/entities/DeleteDepartmentFormDialog/DeleteDepartmentFormDialog';
import { Loader } from '@/widgets/Loader';

const AddDepartmentPage = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const {
    hasOpenToast,
    toastDataForAddRoomForm,
    isOpenDepartmentAddCard,
    setIsOpenDepartmentAddCard,
    isOpenDepartmentDeleteCard,
    setIsOpenDepartmentDeleteCard,
  } = useContext(ButtonsContext);

  const allDepartmentsData = useSelector(getAllDepartmentsData);
  const allDepartmentsError = useSelector(getAllDepartmentsError);
  const allDepartmentsIsLoading = useSelector(getAllDepartmentsIsLoading);

  const [deleteDepartmentId, setDeleteDepartmentId] = useState<string>();

  const handleCardAddCard = () => {
    setIsOpenDepartmentAddCard(true);
  };

  useEffect(() => {
    dispatch(fetchAllDepartments({}));
  }, [dispatch]);

  const handleClickDeleteDepartment = (id: string) => {
    setDeleteDepartmentId(id);

    setIsOpenDepartmentDeleteCard(true);
  };

  return (
    <div className={cls.AddDepartmentPageWrp}>
      <div className={cls.AddDepartmentPageWrp__Title}>
        <p className={cls['AddDepartmentPageWrp__Title--text']}>
          {t('Bo‘limlar')}
          <span className={cls['AddDepartmentPageWrp__Title--span']}>
            ({allDepartmentsData ? allDepartmentsData.length : 0})
          </span>
        </p>

        <div className={cls['AddDepartmentPageWrp__Title--IconDiv']}>
          <CarbonAdd
            onClick={handleCardAddCard}
            className={cls['AddDepartmentPageWrp__Title--Icon']}
          />
        </div>
      </div>

      <table className={cls.AddDepartmentPageWrp__Table}>
        <thead className={cls['AddDepartmentPageWrp__Table--Tablethead']}>
          <tr className={cls['AddDepartmentPageWrp__Table--tr']}>
            <th className={cls['AddDepartmentPageWrp__Table--th']}>
              {t("Bo'lim rasmi")}
            </th>

            <th className={cls['AddDepartmentPageWrp__Table--th']}>
              {t("Bo'lim nomi")}
            </th>

            <th className={cls['AddDepartmentPageWrp__Table--th']}>
              {t('Shifokorlar soni')}
            </th>

            <th className={cls['AddDepartmentPageWrp__Table--th']}>
              {t('Xonalar soni')}
            </th>

            <th className={cls['AddDepartmentPageWrp__Table--edit']} />
            <th className={cls['AddDepartmentPageWrp__Table--delete']} />
          </tr>
        </thead>
        {allDepartmentsData && allDepartmentsData.length > 0 && (
          <tbody className={cls['AddDepartmentPageWrp__Table--Tabletbody']}>
            {allDepartmentsData.map((item) => {
              const ImgSvg = `http://medapi.magicsoft.uz/${item.photo}`;

              return (
                <tr
                  key={item?.id}
                  className={cls['AddDepartmentPageWrp__Table--tr']}
                >
                  <td className={cls['AddDepartmentPageWrp__Table--td']}>
                    <img
                      src={ImgSvg}
                      className={cls['AddDepartmentPageWrp__Table--img']}
                      alt="?"
                    />
                  </td>

                  <td className={cls['AddDepartmentPageWrp__Table--td']}>
                    {item?.name ? item.name : '-'}
                  </td>

                  <td className={cls['AddDepartmentPageWrp__Table--td']}>
                    {item.rooms_id.length ? (
                      item?.rooms_id?.length
                    ) : (
                      <p
                        className={cls['AddDepartmentPageWrp__Table--invalid']}
                      >
                        {t("Shifokor yo'q")}
                      </p>
                    )}
                  </td>

                  <td className={cls['AddDepartmentPageWrp__Table--td']}>
                    {item.rooms_id.length ? (
                      item?.rooms_id?.length
                    ) : (
                      <p
                        className={cls['AddDepartmentPageWrp__Table--invalid']}
                      >
                        {t("Xona yo'q")}
                      </p>
                    )}
                  </td>

                  <td className={cls['AddDepartmentPageWrp__Table--lastChild']}>
                    {}
                    <PenTools
                      className={cls['AddDepartmentPageWrp__Table--edit']}
                    />
                  </td>

                  <td
                    className={cls['AddDepartmentPageWrp__Table--lastChild2']}
                    onClick={() => handleClickDeleteDepartment(item?.id)}
                  >
                    {}
                    <DeleteTools
                      className={cls['AddDepartmentPageWrp__Table--delete']}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}

        {allDepartmentsIsLoading && <Loader />}

        {allDepartmentsError && <ErrorDialog isErrorProps={!false} />}
      </table>

      {deleteDepartmentId && isOpenDepartmentDeleteCard && (
        <DeleteDepartmentFormDialog departmentId={deleteDepartmentId} />
      )}

      {hasOpenToast && (
        <Toast
          severity={toastDataForAddRoomForm?.toastSeverityForAddRoomForm}
          message={toastDataForAddRoomForm?.toastMessageForAddRoomForm}
        />
      )}

      {isOpenDepartmentAddCard ? <AddDepartmentFormDialog /> : ''}
    </div>
  );
};

export default AddDepartmentPage;
