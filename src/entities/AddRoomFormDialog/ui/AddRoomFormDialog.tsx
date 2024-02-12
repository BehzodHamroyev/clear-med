import React, { useContext, useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import { styled } from '@mui/material/styles';
import {
  Dialog,
  Select,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
} from '@mui/material';

import cls from './AddRoomFormDialog.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  fetchAllDepartments,
  getAllDepartmentsData,
  getAllDepartmentsError,
  getAllDepartmentsIsLoading,
} from '@/pages/AddDepartmentPage';

import {
  getAllFreeDoctorsData,
  getAllFreeDoctorsError,
  getAllFreeDoctorsIsLoading,
} from '../model/selector/allFreeDoctorsSelector';

import { fetchAllFreeDoctors } from '../model/service/fetchAllFreeDoctors';

import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';

import { baseUrl } from '../../../../baseurl';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { fetchAllRooms } from '@/pages/AddRoomPage/model/services/fetchAllRooms';

interface AddRoomFormDialogProps {
  className?: string;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const AddRoomFormDialog = ({ className }: AddRoomFormDialogProps) => {
  const { t } = useTranslation();

  const roomNumberRef = useRef<HTMLInputElement>(null);
  const departmentSelectRef = useRef<HTMLSelectElement>(null);
  const doctorSelectRef = useRef<HTMLSelectElement>(null);

  const dispatch = useAppDispatch();

  const [addRoomFormDialogIsLoading, setAddRoomFormDialogIsLoading] =
    useState(false);

  const {
    isOpenRoomAddCard,
    setIsOpenRoomAddCard,
    setHasOpenToast,
    setToastDataForAddRoomForm,
  } = useContext(ButtonsContext);

  const allDepartmentsData = useSelector(getAllDepartmentsData);
  const allDepartmentsIsLoading = useSelector(getAllDepartmentsIsLoading);
  const allDepartmentsError = useSelector(getAllDepartmentsError);

  const allFreeDoctorsData = useSelector(getAllFreeDoctorsData);
  const allFreeDoctorsIsLoading = useSelector(getAllFreeDoctorsIsLoading);
  const allFreeDoctorsError = useSelector(getAllFreeDoctorsError);

  const handleClose = () => {
    setIsOpenRoomAddCard(false);
  };

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setAddRoomFormDialogIsLoading(true);

    const token = Cookies.get('token');

    // Access values using refs
    const roomNumber = roomNumberRef.current?.value;
    const selectedDepartment = departmentSelectRef.current?.value;
    const selectedDoctor = doctorSelectRef.current?.value;

    if (roomNumber && selectedDepartment && selectedDoctor) {
      try {
        const response = await axios.post(
          `${baseUrl}/room/create`,
          {
            department_id: selectedDepartment,
            doctor_id: selectedDoctor,
            name: Number(roomNumber),
          },
          {
            maxBodyLength: Infinity,
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data) {
          setAddRoomFormDialogIsLoading(false);

          setIsOpenRoomAddCard(false);

          setHasOpenToast(true);

          setToastDataForAddRoomForm({
            toastMessageForAddRoomForm: t("Xona muvaffaqiyatli qo'shildi"),
            toastSeverityForAddRoomForm: 'success',
          });

          dispatch(fetchAllRooms({}));
        }
      } catch (error) {
        setAddRoomFormDialogIsLoading(false);

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 403) {
            setToastDataForAddRoomForm({
              toastMessageForAddRoomForm: t(
                "Bu doktor boshqa xonaga biriktirilgan. Doktorni o'zgartiring",
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

  useEffect(() => {
    if (isOpenRoomAddCard) {
      dispatch(fetchAllDepartments({}));

      dispatch(fetchAllFreeDoctors({}));
    }
  }, [dispatch, isOpenRoomAddCard]);

  return (
    <>
      {allDepartmentsData && allFreeDoctorsData && (
        <BootstrapDialog
          className={classNames(cls.AddRoomFormDialog__Container, {}, [
            className,
          ])}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={isOpenRoomAddCard}
        >
          <div className={classNames(cls.AddRoomFormDialog, {}, [className])}>
            <div className={classNames(cls.AddRoomFormDialog__head)}>
              <p>{t("Xona qo'shish")}</p>
            </div>

            <form
              className={classNames(cls.AddRoomFormDialog__form)}
              onSubmit={handleFormSubmit}
            >
              <TextField
                required
                inputRef={roomNumberRef}
                id="outlined-basic"
                label={t('Xona raqami')}
                variant="outlined"
                type="number"
              />

              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  {t("Bo'lim turlari")}
                </InputLabel>

                <Select
                  required
                  inputRef={departmentSelectRef}
                  id="demo-simple-select"
                  labelId="demo-simple-select-label"
                  label={t("Bo'lim turlari")}
                >
                  {allDepartmentsData?.map((e) => {
                    return (
                      <MenuItem key={e.id} value={`${e.id}`}>
                        {e?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel id="demo-simple-select-label2">
                  {t("Shifokorlar ro'yhati")}
                </InputLabel>

                <Select
                  required
                  inputRef={doctorSelectRef}
                  id="demo-simple-select2"
                  labelId="demo-simple-select-label2"
                  label={t("Shifokorlar ro'yhati")}
                >
                  {allFreeDoctorsData?.map((element) => {
                    return (
                      <MenuItem key={element.id} value={`${element.id}`}>
                        {element.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <div className={classNames(cls.AddRoomFormDialog__buttons)}>
                <button
                  type="button"
                  className={classNames(
                    cls['AddRoomFormDialog__buttons--cansel'],
                  )}
                  onClick={handleClose}
                >
                  {t('Bekor qilish')}
                </button>

                <button
                  type="submit"
                  className={classNames(
                    cls['AddRoomFormDialog__buttons--submit'],
                  )}
                >
                  {t('Saqlash')}
                </button>
              </div>
            </form>
          </div>
        </BootstrapDialog>
      )}

      {(allDepartmentsIsLoading ||
        allFreeDoctorsIsLoading ||
        addRoomFormDialogIsLoading) && <Loader />}

      {(allDepartmentsError || allFreeDoctorsError) && (
        <ErrorDialog isErrorProps={!false} />
      )}
    </>
  );
};

export default AddRoomFormDialog;
