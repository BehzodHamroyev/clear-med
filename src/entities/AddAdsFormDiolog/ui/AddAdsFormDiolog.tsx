import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';

import { useTranslation } from 'react-i18next';

import { Dialog } from '@mui/material';
import cls from './AddAdsFormDiolog.module.scss';

import { baseUrl } from '../../../../baseurl';
import { Doctor, GetImage } from '@/shared/assets/Pages/Doctor';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchAllAds } from '@/pages/admin/AddAdsPage/model/services/fetchAllAds';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import instance from '@/shared/lib/axios/api';

const AddAdsFormDiolog = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const {
    setHasOpenToast,
    setToastDataForAddRoomForm,
    isOpenAdvertisementAddCard,
    setIsOpenAdvertisementAddCard,
  } = React.useContext(ButtonsContext);

  const [isValidUrl, setIsValidUrl] = useState<boolean | null>(null);

  const [selectedFile, setSelectedFile] = React.useState<any>(null);

  const [isAllFormData, setIsAllFormData] = React.useState({
    name: '',
    file: undefined,
    link: '',
  });

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  const validateUrl = (inputUrl: string) => {
    const urlPattern = /^(https?:\/\/)([\w.]+)\.([a-z]{2,})(\/\S*)?$/;
    return urlPattern.test(inputUrl);
  };

  const handleUrlInputChange = (e: { target: { value: string } }) => {
    const inputValue = e.target.value;

    setIsAllFormData({ ...isAllFormData, link: inputValue });

    setIsValidUrl(validateUrl(inputValue));
  };

  const handleSubmitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();


    const data = new FormData();

    if (
      isValidUrl &&
      isValidUrl !== null &&
      isAllFormData.name &&
      isAllFormData.link
    ) {
      data.append('file', selectedFile);
      data.append('name', `${isAllFormData!.name}`);
      data.append('link', `${isAllFormData!.link}`);

      try {
        const response = await instance.post(`${baseUrl}/videos/create`, data,
        );

        if (response.data) {
          setIsOpenAdvertisementAddCard(false);

          setHasOpenToast(true);

          setToastDataForAddRoomForm({
            toastMessageForAddRoomForm: t("Reklama muvaffaqiyatli qo'shildi"),
            toastSeverityForAddRoomForm: 'success',
          });

          dispatch(fetchAllAds({}));
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 403) {
            setToastDataForAddRoomForm({
              toastMessageForAddRoomForm: t(
                "Ushbu Url takrorlangan , urlni o'zgartiring",
              ),
              toastSeverityForAddRoomForm: 'warning',
            });

            setHasOpenToast(true);
          }

          if (error.response?.status === 404) {
            setToastDataForAddRoomForm({
              toastMessageForAddRoomForm: t(
                "Barcha maydonlar to'ldirilishi shart",
              ),
              toastSeverityForAddRoomForm: 'warning',
            });

            setHasOpenToast(true);
          }

          if (
            error.response?.status !== 404 &&
            error.response?.status !== 403
          ) {
            setToastDataForAddRoomForm({
              toastMessageForAddRoomForm: t(
                "Barcha maydonlar to'ldirilishi shart",
              ),
              toastSeverityForAddRoomForm: 'warning',
            });

            setHasOpenToast(true);
          }
        }
      }
    }
  };

  const handleClose = () => {
    setIsOpenAdvertisementAddCard(false);
  };

  /* UI */
  return (
    <Dialog
      onClose={handleClose}
      open={isOpenAdvertisementAddCard}
      className={cls.DepartmentAddWrapper}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <p className={cls.CardTitle}>{t('Reklama qo’shish')}</p>

        <form onSubmit={handleSubmitForm} className={cls.AddDoctorCard}>
          <div className={cls.AddCardImg}>
            <LazyLoadImage
              className={cls.AddCardImgValue}
              src={selectedFile ? URL.createObjectURL(selectedFile) : Doctor}
              alt="#"
            />

            <button
              type="button"
              onClick={handleClick}
              className={cls.AddCardImgValuebtn}
            >
              <GetImage />
              { }
            </button>

            <input
              id="input"
              type="file"
              ref={inputRef}
              style={{ display: 'none' }}
              accept=".jpg, .jpeg, .png, .svg, .heic, .webp"
              onChange={(e) => handleFileChange(e)}
            />
          </div>

          <div className={cls.CardBody}>
            <input
              required
              type="text"
              maxLength={30}
              className={cls.InputBulim}
              placeholder={t('Reklama nomi')}
              onChange={(e) => {
                setIsAllFormData({ ...isAllFormData, name: e.target.value });
              }}
            />

            <input
              required
              type="text"
              className={cls.InputBulim}
              placeholder={t('Reklama manzili (Url)')}
              onChange={handleUrlInputChange}
              style={{
                borderColor:
                  isValidUrl === null ? 'black' : isValidUrl ? 'green' : 'red',
              }}
            />

            <div className={cls.BtnParnet}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpenAdvertisementAddCard(false);
                }}
                type="button"
                className={`${cls.Btn} ${cls.Btn1}`}
              >
                {t('Bekor qilish')}
              </button>

              <button type="submit" className={`${cls.Btn} ${cls.Btn2}`}>
                {t('Saqlash')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default AddAdsFormDiolog;
