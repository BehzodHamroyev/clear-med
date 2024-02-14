/* eslint-disable consistent-return */
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import cls from './FileUploader.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import instance from '@/shared/lib/axios/api';
import { Loader } from '@/widgets/Loader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getAllDataProject } from '../model/service/getAllDataProject';
import {
  error,
  getInfoProject,
  isLoading,
} from '../model/selector/getInfoProject';
import Toast from '@/shared/ui/Toast/Toast';

export const FileUploader = () => {
  const [file, setFile] = useState<any>(null);
  const [name, setName] = useState('');
  const [isLoadingForProjectLogo, setIsLoadingForProjectLogo] = useState(false);

  const dispatch = useAppDispatch();
  const infoProject = useSelector(getInfoProject);
  const isLoadingInfoProject = useSelector(isLoading);
  const errorInfoProject = useSelector(error);

  const {
    setIsOpenDoctorEditCard,
    setHasOpenToast,
    setToastDataForAddRoomForm,
    toastDataForAddRoomForm,
    hasOpenToast,
  } = useContext(ButtonsContext);

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setFile(file);

    console.log(file);
  };

  const submitLogo = async () => {
    setIsLoadingForProjectLogo(true);

    const formData = new FormData();
    formData.append('file', file!);
    formData.append('name', name!);
    formData.append('summary', 'summary'!);
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
  };

  useEffect(() => {
    dispatch(getAllDataProject({}));
  }, [dispatch]);

  return (
    <div>
      {isLoadingForProjectLogo && <Loader />}
      <div className={cls.wrapperFileUploader}>
        <div className={cls.logoWrapper}>
          {file ? (
            <img className={cls.img} src={URL.createObjectURL(file!)} alt="" />
          ) : (
            ''
          )}
          <div>
            <input type="file" onChange={(e) => handleFile(e)} />
            <Button variant="contained" className={cls.buttonFileUploader}>
              Upload Logo
            </Button>
          </div>
        </div>
      </div>
      <div className={cls.wrapperInput}>
        {/* <p>Hospital name</p> */}
        <TextField
          className={cls.textField}
          id="outlined-basic"
          label="Hospital name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={cls.submit}>
        <Button variant="contained" onClick={() => submitLogo()}>
          Save
        </Button>
      </div>

      {hasOpenToast && (
        <Toast
          message={toastDataForAddRoomForm?.toastMessageForAddRoomForm}
          severity={toastDataForAddRoomForm?.toastSeverityForAddRoomForm}
        />
      )}
    </div>
  );
};
