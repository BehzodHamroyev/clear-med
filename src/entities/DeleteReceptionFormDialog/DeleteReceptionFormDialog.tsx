import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import axios from 'axios';

import { styled } from '@mui/material/styles';
import { Dialog } from '@mui/material';

import cls from './DeleteReceptinoFormDialog.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

import { baseUrl } from '../../../baseurl';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Loader } from '@/widgets/Loader';
import { fetchAllReceptions } from '@/pages/admin/AddReceptionPage/model/service/fetchAllReceptions';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface DeleteReceptionFormDialogProps {
  receptionId: string;
}

const DeleteReceptionFormDialog = ({
  receptionId,
}: DeleteReceptionFormDialogProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [
    deleteReceptionFormDialogSubmitIsLoading,
    setDeleteReceptionFormDialogSubmitIsLoading,
  ] = useState(false);

  const {
    isOpenDeleteReceptionCard,
    setIsOpenDeleteReceptionCard,

    setHasOpenToast,
    setToastDataForAddRoomForm,
  } = useContext(ButtonsContext);

  const handleClose = () => {
    setIsOpenDeleteReceptionCard(false);
  };

  const handleSubmit = async () => {
    setDeleteReceptionFormDialogSubmitIsLoading(true);

    const token = Cookies.get('token');

    try {
      const response = await axios.delete(
        `${baseUrl}/users/${receptionId}`,

        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data) {
        setDeleteReceptionFormDialogSubmitIsLoading(false);

        setIsOpenDeleteReceptionCard(false);

        setHasOpenToast(true);

        setToastDataForAddRoomForm({
          toastMessageForAddRoomForm: t("Reception o'chirildi"),
          toastSeverityForAddRoomForm: 'success',
        });

        dispatch(fetchAllReceptions({}));
      }
    } catch (error) {
      setDeleteReceptionFormDialogSubmitIsLoading(false);

      setHasOpenToast(true);

      setToastDataForAddRoomForm({
        toastMessageForAddRoomForm: t(
          "Reception o'chirilmadi. Tizimda xatolik sodir bo'ldi",
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
        open={isOpenDeleteReceptionCard}
      >
        <div className={classNames(cls.DeleteDoctorFormDialog)}>
          <div className={classNames(cls.DeleteDoctorFormDialog__head)}>
            <p> {t("Ushbu receptionni xaqiyqatdan ham o'chirmoqchimisiz ?")}</p>
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

      {deleteReceptionFormDialogSubmitIsLoading && <Loader />}
    </>
  );
};

export default DeleteReceptionFormDialog;
