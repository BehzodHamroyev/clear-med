import React, { useContext, useState } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import { Dialog } from '@mui/material';
import { styled } from '@mui/material/styles';

import cls from './DeleteMonitorFormDialog.module.scss';

import { Loader } from '@/widgets/Loader';
import { baseUrl } from '../../../../baseurl';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchGetAllMonitors } from '../../../pages/AddMonitorPage/model/service/fetchGetAllMonitors';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface DeleteRoomFormDialogProps {}

const DeleteMonitorFormDialog = (prop: DeleteRoomFormDialogProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [
    deleteMonitorFormDialogSubmitIsLoading,
    setDeleteMonitorFormDialogSubmitIsLoading,
  ] = useState(false);

  const {
    monitorGetId,
    setHasOpenToast,
    isOpenMonitorDeleteCard,
    setIsOpenMonitorDeleteCard,
    setToastDataForAddRoomForm,
  } = useContext(ButtonsContext);

  const handleClose = () => {
    setIsOpenMonitorDeleteCard(false);
  };

  const handleSubmit = async () => {
    setDeleteMonitorFormDialogSubmitIsLoading(true);

    const token = Cookies.get('token');
    if (monitorGetId) {
      try {
        const response = await axios.delete(
          `${baseUrl}/users/${monitorGetId}`,

          {
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data) {
          setDeleteMonitorFormDialogSubmitIsLoading(false);

          setIsOpenMonitorDeleteCard(false);

          setHasOpenToast(true);

          setToastDataForAddRoomForm({
            toastMessageForAddRoomForm: t("Monitor o'chirildi"),
            toastSeverityForAddRoomForm: 'success',
          });

          dispatch(fetchGetAllMonitors({}));
        }
      } catch (error) {
        setDeleteMonitorFormDialogSubmitIsLoading(false);

        setHasOpenToast(true);

        setToastDataForAddRoomForm({
          toastMessageForAddRoomForm: t(
            "Monitor o'chirilmadi. Tizimda xatolik sodir bo'ldi",
          ),
          toastSeverityForAddRoomForm: 'error',
        });
      }
    }
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        open={isOpenMonitorDeleteCard}
        aria-labelledby="customized-dialog-title"
        className={classNames(cls.DeleteRoomFormDialog__Container, {})}
      >
        <div className={classNames(cls.DeleteRoomFormDialog)}>
          <div className={classNames(cls.DeleteRoomFormDialog__head)}>
            <p> {t("Ushbu Monitorni xaqiyqatdan ham o'chirmoqchimisiz ?")}</p>
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

      {deleteMonitorFormDialogSubmitIsLoading && <Loader />}
    </>
  );
};

export default DeleteMonitorFormDialog;
