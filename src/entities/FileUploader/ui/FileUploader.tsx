import React, { ChangeEvent, useContext, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, TextField } from '@mui/material';
import Input from 'react-phone-number-input/input';

import cls from './FileUploader.module.scss';

import { Loader } from '@/widgets/Loader';
import Toast from '@/shared/ui/Toast/Toast';
import instance from '@/shared/lib/axios/api';
import { getInfoProject } from '../model/selector/getInfoProject';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { getAllDataProject } from '../model/service/getAllDataProject';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

export const FileUploader = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [file, setFile] = useState<any>(null);
  const [isLoadingForProjectLogo, setIsLoadingForProjectLogo] = useState(false);

  const {
    hasOpenToast,
    setHasOpenToast,
    toastDataForAddRoomForm,
    setToastDataForAddRoomForm,
  } = useContext(ButtonsContext);

  const infoProject = useSelector(getInfoProject);

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setFile(file);
  };

  const handleInputChange = (event: any) => {
    setPhoneNumber(event);
  };

  const handleFormSubmitData = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setIsLoadingForProjectLogo(true);

    const formData = new FormData();

    if (
      phoneNumber.startsWith('+998') &&
      phoneNumber.length > 8 &&
      phoneNumber.length >= 8
    ) {
      formData.append('file', file!);
      formData.append('name', name!);
      formData.append('email', email!);
      formData.append('address', address!);
      formData.append(
        'phoneNumber',
        `${phoneNumber.split('+998')[1].replace(/\s/g, '')}`,
      );
      formData.append('summary', 'summary'!);
    }

    try {
      const response = await instance.patch(
        `/about/${infoProject!?.[0]._id}`,
        formData,
      );
      if (response.data) {
        setFile(null);
        setName('');
        setIsLoadingForProjectLogo(false);
        setHasOpenToast(true);
        setToastDataForAddRoomForm({
          toastMessageForAddRoomForm: t("Project ma'lumotlari yangilandi"),
          toastSeverityForAddRoomForm: 'success',
        });

        dispatch(getAllDataProject({}));
      }

      return response.data;
    } catch (error) {
      setIsLoadingForProjectLogo(false);
    }

    return '';
  };

  useEffect(() => {
    dispatch(getAllDataProject({}));
  }, [dispatch]);

  return (
    <div className={cls.FileUploaderWrp}>
      <form onSubmit={handleFormSubmitData}>
        <div className={cls.wrapperFileUploader}>
          <div className={cls.logoWrapper}>
            {file ? (
              <img
                className={cls.img}
                src={URL.createObjectURL(file!)}
                alt=""
              />
            ) : (
              ''
            )}
            <div>
              <input
                type="file"
                onChange={(e) => handleFile(e)}
                accept=".jpg, .jpeg, .png, .svg, .heic, .webp"
              />
              <Button variant="contained" className={cls.buttonFileUploader}>
                {t('Upload Logo')}
              </Button>
            </div>
          </div>
        </div>

        <div className={cls.wrapperInput}>
          <Input
            required
            minLength={8}
            maxLength={17}
            name="PhoneNumber"
            autoComplete="off"
            value={phoneNumber}
            className={cls.phoneInputText}
            onChange={(e) => handleInputChange(e)}
            placeholder={`${t('Telefon raqami')}* (+998 90 123 45 67)`}
          />
        </div>

        <div className={cls.wrapperInput}>
          <TextField
            required
            value={name}
            variant="outlined"
            id="outlined-basic"
            inputProps={{
              autocomplete: 'off',
            }}
            className={cls.textField}
            label={`${t('Hospital name')}`}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={cls.wrapperInput}>
          <TextField
            type="email"
            value={email}
            variant="outlined"
            id="outlined-basic"
            inputProps={{
              autocomplete: 'off',
            }}
            className={cls.textField}
            label={`${t('Hospital email')}`}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={cls.wrapperInput}>
          <TextField
            type="text"
            value={address}
            variant="outlined"
            id="outlined-basic"
            inputProps={{
              autocomplete: 'off',
            }}
            className={cls.textField}
            label={`${t('Hospital address')}`}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className={cls.submit}>
          <Button type="submit" variant="contained">
            {t('Save')}
          </Button>
        </div>
      </form>

      {isLoadingForProjectLogo && <Loader />}

      {hasOpenToast && (
        <Toast
          message={toastDataForAddRoomForm?.toastMessageForAddRoomForm}
          severity={toastDataForAddRoomForm?.toastSeverityForAddRoomForm}
        />
      )}
    </div>
  );
};
