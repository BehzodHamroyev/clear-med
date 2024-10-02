import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import axios from 'axios';

import { styled } from '@mui/material/styles';
import { Dialog } from '@mui/material';

import cls from './DeleteDoctorFormDialog.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

import { baseUrl } from '../../../baseurl';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Loader } from '@/widgets/Loader';
import { fetchAllDoctors } from '@/pages/admin/AddDoctorPage/model/service/fetchAllDoctors';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface DeleteDoctorFormDialogProps {
  doctorId: string;
}

const DeleteDoctorFormDialog = ({ doctorId }: DeleteDoctorFormDialogProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [
    deleteDoctorFormDialogSubmitIsLoading,
    setDeleteDoctorFormDialogSubmitIsLoading,
  ] = useState(false);

  const {
    isOpenDoctorDeleteCard,
    setIsOpenDoctorDeleteCard,
    setHasOpenToast,
    setToastDataForAddRoomForm,
  } = useContext(ButtonsContext);

  const handleClose = () => {
    setIsOpenDoctorDeleteCard(false);
  };

  const handleSubmit = async () => {
    setDeleteDoctorFormDialogSubmitIsLoading(true);

    const token = Cookies.get('token');

    try {
      const response = await axios.delete(
        `${baseUrl}/users/${doctorId}`,

        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data) {
        setDeleteDoctorFormDialogSubmitIsLoading(false);

        setIsOpenDoctorDeleteCard(false);

        setHasOpenToast(true);

        setToastDataForAddRoomForm({
          toastMessageForAddRoomForm: t("Shifokor o'chirildi"),
          toastSeverityForAddRoomForm: 'success',
        });

        dispatch(fetchAllDoctors({}));
      }
    } catch (error) {
      setDeleteDoctorFormDialogSubmitIsLoading(false);

      setHasOpenToast(true);

      setToastDataForAddRoomForm({
        toastMessageForAddRoomForm: t(
          "Shifokor o'chirilmadi. Tizimda xatolik sodir bo'ldi",
        ),
        toastSeverityForAddRoomForm: 'error',
      });
    }
  };

  return (
    <>
      <BootstrapDialog
        className={classNames(cls.DeleteDoctorFormDialog__Container, {})}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpenDoctorDeleteCard}
      >
        <div className={classNames(cls.DeleteDoctorFormDialog)}>
          <div className={classNames(cls.DeleteDoctorFormDialog__head)}>
            <p> {t("Ushbu shifokor xaqiyqatdan ham o'chirmoqchimisiz ?")}</p>
          </div>
          <div className={classNames(cls.DeleteDoctorFormDialog__buttons)}>
            <button
              type="button"
              className={classNames(
                cls['DeleteDoctorFormDialog__buttons--cansel'],
              )}
              onClick={handleClose}
            >
              {t('Bekor qilish')}
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className={classNames(
                cls['DeleteDoctorFormDialog__buttons--submit'],
              )}
            >
              {t("O'chirish")}
            </button>
          </div>
        </div>
      </BootstrapDialog>

      {deleteDoctorFormDialogSubmitIsLoading && <Loader />}
    </>
  );
};

export default DeleteDoctorFormDialog;
