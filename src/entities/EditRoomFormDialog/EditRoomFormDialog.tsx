import React, { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import axios from 'axios';

import { styled } from '@mui/material/styles';
import {
  Dialog,
  Select,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
} from '@mui/material';

import cls from './EditRoomFormDialog.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

import { baseUrl } from '../../../baseurl';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface Department {
  _id: string;
  name: string;
  duration: number;
  image: string;
  disabled: boolean;
  photo: string;
  __v: number;
  id: string;
}

interface Doctor {
  _id: string;
  name: string;
  login: number;
  role: string;
  passwordChangedDate: null | string;
  exprience: number;
  photo: string;
  __v: number;
  id: string;
}

interface Message {
  _id: string;
  name: number;
  department_id: Department;
  doctor_id: Doctor;
  disabled: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

interface ApiResponse {
  message: Message;
}

interface EditRoomFormDialogProps {
  roomId: string;
}

const EditRoomFormDialog = ({ roomId }: EditRoomFormDialogProps) => {
  const { t } = useTranslation();

  const roomNumberRef = useRef<HTMLInputElement>(null);
  const departmentSelectRef = useRef<HTMLSelectElement>(null);
  const doctorSelectRef = useRef<HTMLSelectElement>(null);

  const token = Cookies.get('token');

  const {
    isOpenRoomEditCard,
    setIsOpenRoomEditCard,
    setHasOpenToast,
    toastDataForAddRoomForm,
    setToastDataForAddRoomForm,
  } = useContext(ButtonsContext);

  const fetchRoomData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/room/${roomId}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (roomId) {
      fetchRoomData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const handleClose = () => {
    setIsOpenRoomEditCard(false);
  };

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Access values using refs
    const roomNumber = roomNumberRef.current?.value;
    const selectedDepartment = departmentSelectRef.current?.value;
    const selectedDoctor = doctorSelectRef.current?.value;

    if (roomNumber && selectedDepartment && selectedDoctor) {
      try {
        const response = await axios.post(`${baseUrl}/room/${roomId}`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setIsOpenRoomEditCard(false);

          setHasOpenToast(true);

          setToastDataForAddRoomForm({
            toastMessageForAddRoomForm: t("Xona muvaffaqiyatli qo'shildi"),
            toastSeverityForAddRoomForm: 'success',
          });
        }
      } catch (error) {
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

  return (
    <BootstrapDialog
      className={classNames(cls.AddRoomFormDialog__Container, {})}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpenRoomEditCard}
    >
      <div className={classNames(cls.AddRoomFormDialog)}>
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
              {/* {allDepartmentsData?.map((e) => {
                return (
                  <MenuItem key={e.id} value={`${e.id}`}>
                    {e?.name}
                  </MenuItem>
                );
              })} */}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="demo-simple-select-label2">
              {t("Shifokorlar ro'yhati")}
            </InputLabel>

            <Select
              required
              inputRef={doctorSelectRef}
              id="demo-simple-select"
              labelId="demo-simple-select-label2"
              label={t("Shifokorlar ro'yhati")}
            >
              {/* {allFreeDoctorsData?.map((element) => {
                return (
                  <MenuItem key={element.id} value={`${element.id}`}>
                    {element.name}
                  </MenuItem>
                );
              })} */}
            </Select>
          </FormControl>

          <div className={classNames(cls.AddRoomFormDialog__buttons)}>
            <button
              type="button"
              className={classNames(cls['AddRoomFormDialog__buttons--cansel'])}
              onClick={handleClose}
            >
              {t('Bekor qilish')}
            </button>

            <button
              type="submit"
              className={classNames(cls['AddRoomFormDialog__buttons--submit'])}
            >
              {t('Saqlash')}
            </button>
          </div>
        </form>
      </div>
    </BootstrapDialog>
  );
};

export default EditRoomFormDialog;
