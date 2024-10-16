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
  Autocomplete,
  Checkbox,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from '@mui/material';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
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
  getAllFreeDoctorsData,
  getAllFreeDoctorsError,
  getAllFreeDoctorsIsLoading,
} from '../AddRoomFormDialog/model/selector/allFreeDoctorsSelector';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchAllFreeDoctors } from '../AddRoomFormDialog/model/service/fetchAllFreeDoctors';
import { getAllDepartmentsData, getAllDepartmentsIsLoading, getAllDepartmentsError } from '@/pages/admin/AddDepartmentPage';
import { fetchAllRooms } from '@/pages/admin/AddRoomPage/model/services/fetchAllRooms';
import { fetchAllDepartments } from '@/pages/admin/AddDepartmentPage/model/service/fetchAllDepartments';

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

  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const dispatch = useAppDispatch();

  const [doctorList, setDoctorList] = useState<any[]>([]);

  const [
    editRoomFormDialogSubmitIsLoading,
    setEditRoomFormDialogSubmitIsLoading,
  ] = useState(false);

  const allDepartmentsData = useSelector(getAllDepartmentsData);
  const allDepartmentsIsLoading = useSelector(getAllDepartmentsIsLoading);
  const allDepartmentsError = useSelector(getAllDepartmentsError);

  const allFreeDoctorsData = useSelector(getAllFreeDoctorsData);
  const allFreeDoctorsIsLoading = useSelector(getAllFreeDoctorsIsLoading);
  const allFreeDoctorsError = useSelector(getAllFreeDoctorsError);
  const [doctors, setDoctors] = useState<string[]>([]);

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

        if (
          !doctorList?.some(
            (item) => item._id === response?.data?.message?.doctor_id?._id,
          )
        ) {
          setDoctorList((prev) => [
            ...prev,
            response?.data?.message?.doctor_id,
          ]);
        }

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
      if (doctorList.length > 0) {
        allFreeDoctorsData.forEach((freeDoctor) => {
          if (!doctorList?.some((doctor) => doctor.id === freeDoctor.id)) {
            setDoctorList((prev) => [...prev, freeDoctor]);
          }
        });
      } else {
        setDoctorList([...allFreeDoctorsData]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFreeDoctorsData]);

  const handleClose = () => {
    setDoctorList([]);

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
        departmentId: event?.target?.value,
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
        doctorId: event?.target?.value,
      },
    }));
  };

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setEditRoomFormDialogSubmitIsLoading(true);

    if (
      roomCurrentData?.data?.departmentId &&
      doctors &&
      roomCurrentData?.data?.roomNumber
    ) {
      try {
        const response = await axios.patch(
          `${baseUrl}/room/${roomId}`,
          {
            doctor_id: doctors,
            name: Number(roomCurrentData?.data?.roomNumber),
            department_id: roomCurrentData?.data?.departmentId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data) {
          setEditRoomFormDialogSubmitIsLoading(false);

          setIsOpenRoomEditCard(false);

          setHasOpenToast(true);

          setToastDataForAddRoomForm({
            toastMessageForAddRoomForm: t("Xona ma'lumotlari yangilandi"),
            toastSeverityForAddRoomForm: 'success',
          });

          setDoctorList([]);

          dispatch(fetchAllRooms({}));
        }
      } catch (error) {
        setDoctorList([]);

        setEditRoomFormDialogSubmitIsLoading(false);

        if (axios.isAxiosError(error)) {
          if (error?.response?.status === 403) {
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
            error?.response?.status !== 404 &&
            error?.response?.status !== 403
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

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: any[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any> | undefined,
  ) => {
    setDoctors(value.map((item) => item.id));
  };

  return (
    <>
      {roomCurrentData?.data &&
        allDepartmentsData &&
        allFreeDoctorsData &&
        allFreeDoctorsData.length >= 0 && (
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
                  value={roomCurrentData?.data?.roomNumber}
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
                    value={roomCurrentData?.data?.departmentId}
                    onChange={handleChangeDepartmentName}
                  >
                    {allDepartmentsData?.map((e) => {
                      return (
                        <MenuItem key={e?.id} value={`${e?.id}`}>
                          {e?.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl>
                  <Autocomplete
                    multiple
                    options={allFreeDoctorsData}
                    disableCloseOnSelect
                    onChange={handleChange}
                    id="checkboxes-tags-demo"
                    getOptionLabel={(option) => option.name}
                    className={cls.AddRoomForMonitorOPtionsWrp}
                    renderOption={(
                      props,
                      option: { name: string },
                      { selected },
                    ) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checked={selected}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                        />
                        {option.name}
                      </li>
                    )}
                    style={{
                      width: '100%',
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t(`Shifokorlar ro'yxati`)}
                        style={{ cursor: 'pointer' }}
                        placeholder={`${t('Xonani tanlang')}...`}
                        // required={!(personId.length > 0)}
                      />
                    )}
                  />
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

      {(roomCurrentData?.isLoading ||
        allDepartmentsIsLoading ||
        allFreeDoctorsIsLoading ||
        editRoomFormDialogSubmitIsLoading ||
        roomCurrentData?.isLoading) && <Loader />}

      {(roomCurrentData?.isError ||
        allDepartmentsError ||
        allFreeDoctorsError) && <ErrorDialog isErrorProps={!false} />}
    </>
  );
};

export default EditRoomFormDialog;
