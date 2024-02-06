/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import cls from './AddDepartmentPage.module.scss';

import { LoaderAdmin } from '@/widgets/LoaderAdmin';
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

const AddDepartmentPage = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const {
    hasOpenToast,
    toastDataForAddRoomForm,
    isOpenDepartmentAddCard,
    setIsOpenDepartmentAddCard,
  } = useContext(ButtonsContext);

  const allDepartmentsData = useSelector(getAllDepartmentsData);
  const allDepartmentsError = useSelector(getAllDepartmentsError);
  const allDepartmentsIsLoading = useSelector(getAllDepartmentsIsLoading);

  const handleCardAddCard = () => {
    setIsOpenDepartmentAddCard(true);
  };

  useEffect(() => {
    dispatch(fetchAllDepartments({}));
  }, [dispatch]);

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
        {allDepartmentsData && allDepartmentsData.length > 0 ? (
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
                    {item.rooms_id.length ? item?.rooms_id?.length : '-'}
                  </td>

                  <td className={cls['AddDepartmentPageWrp__Table--td']}>
                    {item.rooms_id.length ? item?.rooms_id?.length : '-'}
                  </td>

                  <td className={cls['AddDepartmentPageWrp__Table--lastChild']}>
                    {}
                    <PenTools
                      className={cls['AddDepartmentPageWrp__Table--edit']}
                    />
                  </td>

                  <td
                    className={cls['AddDepartmentPageWrp__Table--lastChild2']}
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
        ) : allDepartmentsIsLoading ? (
          <LoaderAdmin />
        ) : allDepartmentsError ? (
          <ErrorDialog isErrorProps={!false} />
        ) : (
          ''
        )}
      </table>

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
