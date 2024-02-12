import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import axios from 'axios';

import { styled } from '@mui/material/styles';
import { Dialog } from '@mui/material';

import cls from './DeleteRoomForMonitorPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

import { baseUrl } from '../../../baseurl';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { fetchAllDepartments } from '../../pages/AddDepartmentPage/model/service/fetchAllDepartments';
import { Loader } from '@/widgets/Loader';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface DeleteDeleteRoomForMonitorPageProps {
  RoomId: string;
}

const DeleteRoomForMonitorPage = ({
  RoomId,
}: DeleteDeleteRoomForMonitorPageProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [
    deleteDepartmentFormDialogSubmitIsLoading,
    setDeleteDepartmentFormDialogSubmitIsLoading,
  ] = useState(false);

  const {
    setHasOpenToast,
    isOpenDepartmentDeleteCard,
    setToastDataForAddRoomForm,
    setIsOpenDepartmentDeleteCard,
  } = useContext(ButtonsContext);

  const handleClose = () => {
    setIsOpenDepartmentDeleteCard(false);
  };

  const handleSubmit = async () => {
    setDeleteDepartmentFormDialogSubmitIsLoading(true);

    const token = Cookies.get('token');

    try {
      const response = await axios.delete(
        `${baseUrl}/monitor/${RoomId}`,

        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data) {
        setDeleteDepartmentFormDialogSubmitIsLoading(false);

        setIsOpenDepartmentDeleteCard(false);

        setHasOpenToast(true);

        setToastDataForAddRoomForm({
          toastMessageForAddRoomForm: t("Xona o'chirildi"),
          toastSeverityForAddRoomForm: 'success',
        });

        dispatch(fetchAllDepartments({}));
      }
    } catch (error) {
      setDeleteDepartmentFormDialogSubmitIsLoading(false);

      console.log(error);

      setHasOpenToast(true);

      setToastDataForAddRoomForm({
        toastMessageForAddRoomForm: t(
          "Xona o'chirilmadi. Tizimda xatolik sodir bo'ldi",
        ),
        toastSeverityForAddRoomForm: 'error',
      });
    }
  };

  return (
    <>
      <BootstrapDialog
        className={classNames(cls.DeleteDepartmentFormDialog__Container, {})}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpenDepartmentDeleteCard}
      >
        <div className={classNames(cls.DeleteDepartmentFormDialog)}>
          <div className={classNames(cls.DeleteDepartmentFormDialog__head)}>
            <p> {t("Ushbu Xonani xaqiyqatdan ham o'chirmoqchimisiz ?")}</p>
          </div>
          <div className={classNames(cls.DeleteDepartmentFormDialog__buttons)}>
            <button
              type="button"
              className={classNames(
                cls['DeleteDepartmentFormDialog__buttons--cansel'],
              )}
              onClick={handleClose}
            >
              {t('Bekor qilish')}
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className={classNames(
                cls['DeleteDepartmentFormDialog__buttons--submit'],
              )}
            >
              {t("O'chirish")}
            </button>
          </div>
        </div>
      </BootstrapDialog>

      {deleteDepartmentFormDialogSubmitIsLoading && <Loader />}
    </>
  );
};

export default DeleteRoomForMonitorPage;
