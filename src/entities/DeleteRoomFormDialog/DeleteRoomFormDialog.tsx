import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import axios from 'axios';

import { styled } from '@mui/material/styles';
import { Dialog } from '@mui/material';

import cls from './DeleteRoomFormDialog.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

import { baseUrl } from '../../../baseurl';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { fetchAllRooms } from '@/pages/AddRoomPage/model/services/fetchAllRooms';
import { Loader } from '@/widgets/Loader';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface DeleteRoomFormDialogProps {
  roomId: string;
}

const DeleteRoomFormDialog = ({ roomId }: DeleteRoomFormDialogProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [
    deleteRoomFormDialogSubmitIsLoading,
    setDeleteRoomFormDialogSubmitIsLoading,
  ] = useState(false);

  const {
    isOpenRoomDeleteCard,
    setIsOpenRoomDeleteCard,
    setHasOpenToast,
    setToastDataForAddRoomForm,
  } = useContext(ButtonsContext);

  const handleClose = () => {
    setIsOpenRoomDeleteCard(false);
  };

  const handleSubmit = async () => {
    setDeleteRoomFormDialogSubmitIsLoading(true);

    const token = Cookies.get('token');

    try {
      const response = await axios.delete(
        `${baseUrl}/room/${roomId}`,

        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data) {
        setDeleteRoomFormDialogSubmitIsLoading(false);

        setIsOpenRoomDeleteCard(false);

        setHasOpenToast(true);

        setToastDataForAddRoomForm({
          toastMessageForAddRoomForm: t("Xona o'chirildi"),
          toastSeverityForAddRoomForm: 'success',
        });

        dispatch(fetchAllRooms({}));
      }
    } catch (error) {
      setDeleteRoomFormDialogSubmitIsLoading(false);

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
        className={classNames(cls.DeleteRoomFormDialog__Container, {})}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpenRoomDeleteCard}
      >
        <div className={classNames(cls.DeleteRoomFormDialog)}>
          <div className={classNames(cls.DeleteRoomFormDialog__head)}>
            <p> {t("Ushbu xonani xaqiyqatdan ham o'chirmoqchimisiz ?")}</p>
          </div>
          <div className={classNames(cls.DeleteRoomFormDialog__buttons)}>
            <button
              type="button"
              className={classNames(
                cls['DeleteRoomFormDialog__buttons--cansel'],
              )}
              onClick={handleClose}
            >
              {t('Bekor qilish')}
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className={classNames(
                cls['DeleteRoomFormDialog__buttons--submit'],
              )}
            >
              {t("O'chirish")}
            </button>
          </div>
        </div>
      </BootstrapDialog>

      {deleteRoomFormDialogSubmitIsLoading && <Loader />}
    </>
  );
};

export default DeleteRoomFormDialog;
