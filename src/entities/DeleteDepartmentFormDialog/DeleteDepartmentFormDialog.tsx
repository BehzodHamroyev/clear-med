import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import axios from 'axios';

import { styled } from '@mui/material/styles';
import { Dialog } from '@mui/material';

import cls from './DeleteDepartmentFormDialog.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

import { baseUrl } from '../../../baseurl';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { fetchAllDepartments } from '../../pages/AddDepartmentPage/model/service/fetchAllDepartments';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface DeleteDepartmentFormDialogProps {
  departmentId: string;
}

const DeleteDepartmentFormDialog = ({
  departmentId,
}: DeleteDepartmentFormDialogProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const {
    isOpenDepartmentDeleteCard,
    setIsOpenDepartmentDeleteCard,
    setHasOpenToast,
    setToastDataForAddRoomForm,
  } = useContext(ButtonsContext);

  const handleClose = () => {
    setIsOpenDepartmentDeleteCard(false);
  };

  const handleSubmit = async () => {
    const token = Cookies.get('token');

    try {
      const response = await axios.delete(
        `${baseUrl}/department/${departmentId}`,

        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data) {
        setIsOpenDepartmentDeleteCard(false);

        setHasOpenToast(true);

        setToastDataForAddRoomForm({
          toastMessageForAddRoomForm: t("Bo'lim o'chirildi"),
          toastSeverityForAddRoomForm: 'success',
        });

        dispatch(fetchAllDepartments({}));
      }
    } catch (error) {
      console.log(error);

      setHasOpenToast(true);

      setToastDataForAddRoomForm({
        toastMessageForAddRoomForm: t(
          "Bo'lim o'chirilmadi. Tizimda xatolik sodir bo'ldi",
        ),
        toastSeverityForAddRoomForm: 'error',
      });
    }
  };

  return (
    <BootstrapDialog
      className={classNames(cls.DeleteDepartmentFormDialog__Container, {})}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpenDepartmentDeleteCard}
    >
      <div className={classNames(cls.DeleteDepartmentFormDialog)}>
        <div className={classNames(cls.DeleteDepartmentFormDialog__head)}>
          <p> {t("Ushbu bo'limni xaqiyqatdan ham o'chirmoqchimisiz ?")}</p>
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
  );
};

export default DeleteDepartmentFormDialog;
