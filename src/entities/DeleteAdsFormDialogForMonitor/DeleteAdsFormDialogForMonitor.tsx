import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import Cookies from 'js-cookie';
// import axios from 'axios';

import { styled } from '@mui/material/styles';
import { Dialog } from '@mui/material';

import cls from './DeleteAdsFormDialogForMonitor.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

// import { baseUrl } from '../../../baseurl';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Loader } from '@/widgets/Loader';

// import { fetchAllAds } from '../../pages/AddAdsPage/model/services/fetchAllAds';

// import { deleteMonitorAds } from '../../entities/AdvertisementAttachmentMonitor/model/service/deleteMonitorAds';

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
}

const DeleteAdsFormDialogForMonitor = ({
  adsId,
}: DeleteAdsFormDialogForMonitorProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [
    deleteAdsFormDialogSubmitIsLoading,
    setDeleteAdsFormDialogSubmitIsLoading,
  ] = useState(false);

  const {
    isOpenAdvertisementDeleteCard,
    setIsOpenAdvertisementDeleteCard,
    setHasOpenToast,
    setToastDataForAddRoomForm,
  } = useContext(ButtonsContext);

  const handleClose = () => {
    setIsOpenAdvertisementDeleteCard(false);
  };

  // const handleSubmit = async () => {
  //   setDeleteAdsFormDialogSubmitIsLoading(true);

  //   const token = Cookies.get('token');

  //   try {
  //     const response = await axios.delete(
  //       `${baseUrl}/videos/${adsId}`,

  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );
  //     // deleteMonitorAds()

  //     if (response.data) {
  //       setDeleteAdsFormDialogSubmitIsLoading(false);

  //       setIsOpenAdvertisementDeleteCard(false);

  //       setHasOpenToast(true);

  //       setToastDataForAddRoomForm({
  //         toastMessageForAddRoomForm: t("Reklama o'chirildi"),
  //         toastSeverityForAddRoomForm: 'success',
  //       });

  //       dispatch(fetchAllAds({}));
  //     }
  //   } catch (error) {
  //     setDeleteAdsFormDialogSubmitIsLoading(false);
  //     // console.log(error);
  //     setHasOpenToast(true);

  //     setToastDataForAddRoomForm({
  //       toastMessageForAddRoomForm: t(
  //         "Reklama o'chirilmadi. Tizimda xatolik sodir bo'ldi",
  //       ),
  //       toastSeverityForAddRoomForm: 'error',
  //     });
  //   }
  // };

  return (
    <>
      <BootstrapDialog
        className={classNames(cls.DeleteDoctorFormDialog__Container, {})}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpenAdvertisementDeleteCard}
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
              // onClick={handleSubmit}
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
