import React, { Fragment, useContext, useEffect, useRef } from 'react';
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
import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';

import { baseUrl } from '../../../../baseurl';

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

  const {
    isOpenRoomAddCard,
    setIsOpenRoomAddCard,
    setHasOpenToast,
    toastDataForAddRoomForm,
    setToastDataForAddRoomForm,
  } = useContext(ButtonsContext);

  const allDepartmentsData = useSelector(getAllDepartmentsData);
  const allDepartmentsIsLoading = useSelector(getAllDepartmentsIsLoading);
  const allDepartmentsError = useSelector(getAllDepartmentsError);

  const handleClose = () => {
    setIsOpenRoomAddCard(false);
  };

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const token = Cookies.get('token');

    // Access values using refs
    const roomNumber = roomNumberRef.current?.value;
    const selectedDepartment = departmentSelectRef.current?.value;
    const selectedDoctor = doctorSelectRef.current?.value;

    console.log(roomNumber, selectedDepartment, selectedDoctor);

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
          setIsOpenRoomAddCard(false);

          setHasOpenToast(true);
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

  useEffect(() => {
    if (isOpenRoomAddCard) {
      dispatch(fetchAllDepartments({}));
    }
  }, [dispatch, isOpenRoomAddCard]);

  return (
    <>
      {allDepartmentsData && (
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
                  // value={}
                  // onChange={}
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
                  id="demo-simple-select"
                  labelId="demo-simple-select-label2"
                  label={t("Shifokorlar ro'yhati")}
                  value={1}
                  // onChange={}
                >
                  {/* {getListOfDepartments
                  ? getListOfDepartments?.map((e, index) => {
                      return (
                        <MenuItem key={e.id} value={`${e.id}`}>
                          {e?.name}
                        </MenuItem>
                      );
                    })
                  : ''} */}
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

      {allDepartmentsIsLoading && <Loader />}

      {allDepartmentsError && <ErrorDialog isErrorProps={!false} />}
    </>
  );
};

export default AddRoomFormDialog;
