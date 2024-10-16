import React, { useContext, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import cls from './AddDepartmentPage.module.scss';
import { AddDepartmentFormDialog } from '@/entities/AddDepartmentFormDialog';

import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { CarbonAdd } from '@/shared/assets/entities/ButtonNavbar';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { DeleteTools, PenTools } from '@/shared/assets/entities/TableTitle';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import DeleteDepartmentFormDialog from '@/entities/DeleteDepartmentFormDialog/DeleteDepartmentFormDialog';
import { EditDepartmentFormDiolog } from '@/entities/EditDepartmentFormDiolog';
import Toast from '@/shared/ui/Toast/Toast';
import { Loader } from '@/widgets/Loader';

import {
  getAllDepartmentsData,
  getAllDepartmentsError,
  getAllDepartmentsIsLoading,
} from '../model/selector/AllDepartmentSelector';
import { baseUploadUrl } from '../../../../../baseurl';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { fetchAllDepartments } from '../model/service/fetchAllDepartments';

const AddDepartmentPage = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [editDepartmentId, setEditDepartmentId] = useState<string>();

  const [deleteDepartmentId, setDeleteDepartmentId] = useState<string>();

  const {
    hasOpenToast,
    toastDataForAddRoomForm,
    isOpenDepartmentAddCard,
    isOpenDepartmentEditCard,
    setIsOpenDepartmentAddCard,
    isOpenDepartmentDeleteCard,
    setIsOpenDepartmentEditCard,
    setIsOpenDepartmentDeleteCard,
    setIsOpenDepartmentAddCardIconIndex,
  } = useContext(ButtonsContext);

  const allDepartmentsData = useSelector(getAllDepartmentsData);
  const allDepartmentsError = useSelector(getAllDepartmentsError);
  const allDepartmentsIsLoading = useSelector(getAllDepartmentsIsLoading);

  const handleCardAddCard = () => {
    setIsOpenDepartmentAddCard(true);
    setIsOpenDepartmentAddCardIconIndex(undefined);
  };

  const handleClickDeleteDepartment = (id: string) => {
    setDeleteDepartmentId(id);

    setIsOpenDepartmentDeleteCard(true);
  };

  const handeClickEditRoom = (id: string) => {
    setEditDepartmentId(id);
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
        {allDepartmentsData && allDepartmentsData.length > 0 && (
          <tbody className={cls['AddDepartmentPageWrp__Table--Tabletbody']}>
            {allDepartmentsData.map((item: any) => {
              const ImgSvg = `${baseUploadUrl}/${item.photo}`;

              return (
                <tr
                  key={item?.id}
                  className={cls['AddDepartmentPageWrp__Table--tr']}
                >
                  <td className={cls['AddDepartmentPageWrp__Table--td']}>
                    {ImgSvg ? (
                      <LazyLoadImage
                        src={ImgSvg}
                        className={cls['AddDepartmentPageWrp__Table--img']}
                        alt="??"
                      />
                    ) : (
                      ''
                    )}
                  </td>

                  <td className={cls['AddDepartmentPageWrp__Table--td']}>
                    {item?.name ? item.name : '-'}
                  </td>

                  <td className={cls['AddDepartmentPageWrp__Table--td']}>
                    {item?.rooms_id?.length ? (
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
                    {item?.rooms_id?.length ? (
                      item?.rooms_id?.length
                    ) : (
                      <p
                        className={cls['AddDepartmentPageWrp__Table--invalid']}
                      >
                        {t("Xona yo'q")}
                      </p>
                    )}
                  </td>

                  <td
                    onClick={() => {
                      setIsOpenDepartmentEditCard(true);
                    }}
                    className={cls['AddDepartmentPageWrp__Table--lastChild']}
                  >
                    { }
                    <PenTools
                      onClick={() => handeClickEditRoom(item?.id)}
                      className={cls['AddDepartmentPageWrp__Table--edit']}
                    />
                  </td>

                  <td
                    className={cls['AddDepartmentPageWrp__Table--lastChild2']}
                    onClick={() => handleClickDeleteDepartment(item?.id)}
                  >
                    { }
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

      {editDepartmentId && isOpenDepartmentEditCard ? (
        <EditDepartmentFormDiolog editDepartmentId={editDepartmentId} />
      ) : (
        ''
      )}
    </div>
  );
};

export default AddDepartmentPage;
