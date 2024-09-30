import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { styled } from '@mui/material/styles';
import { Dialog } from '@mui/material';

import cls from './DeleteAdsFormDialogForMonitor.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Loader } from '@/widgets/Loader';
import instance from '@/shared/lib/axios/api';
import { getAllAdsVideoForOneMonitor } from '../AdvertisementAttachmentMonitor/model/service/getAllAdsVideoForOneMonitor';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface DeleteAdsFormDialogForMonitorProps {
  adsId?: string;
  connectionId?: string;
  id?: string;
}

const DeleteAdsFormDialogForMonitor = ({
  adsId,
  connectionId,
  id,
}: DeleteAdsFormDialogForMonitorProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [
    deleteAdsFormDialogSubmitIsLoading,
    setDeleteAdsFormDialogSubmitIsLoading,
  ] = useState(false);

  const {
    setHasOpenToast,
    setToastDataForAddRoomForm,
    isOpenAdvertisementDeleteAdsForMonitor,
    setIsOpenAdvertisementDeleteAdsForMonitor,
  } = useContext(ButtonsContext);

  const handleClose = () => {
    setIsOpenAdvertisementDeleteAdsForMonitor(false);
  };

  const handleSubmit = async () => {
    setDeleteAdsFormDialogSubmitIsLoading(true);
    try {
      const response = await instance.put(`/monitor/video/${connectionId}`, {
        video: adsId,
      });

      if (response.data) {
        // setDeleteAdsFormDialogSubmitIsLoading(false);

        setIsOpenAdvertisementDeleteAdsForMonitor(false);

        setHasOpenToast(true);

        setToastDataForAddRoomForm({
          toastMessageForAddRoomForm: t("Reklama o'chirildi"),
          toastSeverityForAddRoomForm: 'success',
        });

        dispatch(getAllAdsVideoForOneMonitor({ id: `${id}` }));
      }
    } catch (error) {
      setDeleteAdsFormDialogSubmitIsLoading(false);
      // console.log(error);
      setHasOpenToast(true);

      setToastDataForAddRoomForm({
        toastMessageForAddRoomForm: t(
          "Reklama o'chirilmadi. Tizimda xatolik sodir bo'ldi",
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
        open={isOpenAdvertisementDeleteAdsForMonitor}
      >
        <div className={classNames(cls.DeleteDoctorFormDialog)}>
          <div className={classNames(cls.DeleteDoctorFormDialog__head)}>
            <p> {t("Ushbu Reklamani xaqiyqatdan ham o'chirmoqchimisiz ?")}</p>
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

      {deleteAdsFormDialogSubmitIsLoading && <Loader />}
    </>
  );
};

export default DeleteAdsFormDialogForMonitor;
