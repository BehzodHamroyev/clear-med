import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
  SelectChangeEvent,
} from '@mui/material';

import cls from './EditRoomFormDialog.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

import { baseUrl } from '../../../baseurl';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';

import {
  ApiResponse,
  EditRoomFormDialogProps,
  RoomEditDataSchema,
} from './editRoomFormDialogTypes';

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
} from '../AddRoomFormDialog/model/selector/allFreeDoctorsSelector';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchAllFreeDoctors } from '../AddRoomFormDialog/model/service/fetchAllFreeDoctors';
import { fetchAllRooms } from '../../pages/AddRoomPage/model/services/fetchAllRooms';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const EditRoomFormDialog = ({ roomId }: EditRoomFormDialogProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const [doctorList, setDoctorList] = useState<any[]>([]);

  const allDepartmentsData = useSelector(getAllDepartmentsData);
  const allDepartmentsIsLoading = useSelector(getAllDepartmentsIsLoading);
  const allDepartmentsError = useSelector(getAllDepartmentsError);

  const allFreeDoctorsData = useSelector(getAllFreeDoctorsData);
  const allFreeDoctorsIsLoading = useSelector(getAllFreeDoctorsIsLoading);
  const allFreeDoctorsError = useSelector(getAllFreeDoctorsError);

  const [roomCurrentData, setRoomCurrentData] = useState<RoomEditDataSchema>();

  const token = Cookies.get('token');

  const {
    isOpenRoomEditCard,
    setIsOpenRoomEditCard,
    setHasOpenToast,
    setToastDataForAddRoomForm,
  } = useContext(ButtonsContext);

  const fetchRoomData = async () => {
    setRoomCurrentData({
      isLoading: true,
      isError: false,
      data: undefined,
    });

    try {
      const response = await axios.get(`${baseUrl}/room/${roomId}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.message) {
        const responceData: ApiResponse = response?.data;

        setDoctorList((prev) => [...prev, response.data.message.doctor_id]);

        setRoomCurrentData({
          isLoading: false,
          isError: false,
          data: {
            roomNumber: String(responceData?.message?.name),
            departmentId: responceData?.message?.department_id?._id,
            doctorId: responceData?.message?.doctor_id?._id,
          },
        });
      }
    } catch (error) {
      setRoomCurrentData({
        isLoading: false,
        isError: true,
        data: undefined,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    if (roomId) {
      fetchRoomData();
    }

    dispatch(fetchAllDepartments({}));

    dispatch(fetchAllFreeDoctors({}));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  useEffect(() => {
    if (allFreeDoctorsData) {
      setDoctorList((prev) => [...prev, ...allFreeDoctorsData]);
    }
  }, [allFreeDoctorsData]);

  const handleClose = () => {
    setIsOpenRoomEditCard(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomCurrentData((prevData) => ({
      ...prevData,
      data: {
        roomNumber: event?.target?.value,
        departmentId: prevData?.data?.departmentId,
        doctorId: prevData?.data?.doctorId,
      },
    }));
  };

  const handleChangeDepartmentName = (event: SelectChangeEvent) => {
    setRoomCurrentData((prevData) => ({
      ...prevData,
      data: {
        roomNumber: prevData?.data?.roomNumber,
        departmentId: event.target.value,
        doctorId: prevData?.data?.doctorId,
      },
    }));
  };

  const handleChangeDoctorName = (event: SelectChangeEvent) => {
    setRoomCurrentData((prevData) => ({
      ...prevData,
      data: {
        roomNumber: prevData?.data?.roomNumber,
        departmentId: prevData?.data?.departmentId,
        doctorId: event.target.value,
      },
    }));
  };

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (
      roomCurrentData?.data?.departmentId &&
      roomCurrentData.data.doctorId &&
      roomCurrentData.data.roomNumber
    ) {
      try {
        const response = await axios.post(
          `${baseUrl}/room/${roomId}`,
          {
            doctor_id: roomCurrentData.data.doctorId,
            name: Number(roomCurrentData.data.roomNumber),
            department_id: roomCurrentData.data.departmentId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data) {
          setIsOpenRoomEditCard(false);

          setHasOpenToast(true);

          setToastDataForAddRoomForm({
            toastMessageForAddRoomForm: t("Xona ma'lumotlari yangilandi"),
            toastSeverityForAddRoomForm: 'success',
          });

          dispatch(fetchAllRooms({}));
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
    <>
      {roomCurrentData?.data?.roomNumber &&
        allDepartmentsData &&
        allFreeDoctorsData && (
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
                  id="outlined-basic"
                  label={t('Xona raqami')}
                  variant="outlined"
                  type="number"
                  value={roomCurrentData.data.roomNumber}
                  onChange={handleInputChange}
                />

                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    {t("Bo'lim turlari")}
                  </InputLabel>

                  <Select
                    required
                    id="demo-simple-select"
                    labelId="demo-simple-select-label"
                    label={t("Bo'lim turlari")}
                    value={roomCurrentData.data.departmentId}
                    onChange={handleChangeDepartmentName}
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
                    id="demo-simple-select"
                    labelId="demo-simple-select-label2"
                    label={t("Shifokorlar ro'yhati")}
                    onChange={handleChangeDoctorName}
                    value={roomCurrentData.data.doctorId}
                  >
                    {doctorList?.map((element) => {
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

      {roomCurrentData?.isLoading &&
        allDepartmentsIsLoading &&
        allFreeDoctorsIsLoading && <Loader />}

      {roomCurrentData?.isError &&
        allDepartmentsError &&
        allFreeDoctorsError && <ErrorDialog isErrorProps={!false} />}
    </>
  );
};

export default EditRoomFormDialog;
