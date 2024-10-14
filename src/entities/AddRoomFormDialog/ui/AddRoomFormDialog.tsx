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
  Autocomplete,
  Checkbox,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from '@mui/material';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import cls from './AddRoomFormDialog.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  getAllFreeDoctorsData,
  getAllFreeDoctorsError,
  getAllFreeDoctorsIsLoading,
} from '../model/selector/allFreeDoctorsSelector';
import { fetchAllFreeDoctors } from '../model/service/fetchAllFreeDoctors';
import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { baseUrl } from '../../../../baseurl';
import { getAllDepartmentsData, getAllDepartmentsIsLoading, getAllDepartmentsError } from '@/pages/admin/AddDepartmentPage';
import { fetchAllRooms } from '@/pages/admin/AddRoomPage/model/services/fetchAllRooms';
import { fetchAllDepartments } from '@/pages/admin/AddDepartmentPage/model/service/fetchAllDepartments';

interface AddRoomFormDialogProps {
  className?: string;
}

interface Roomtype {
  name: string;
  id: string;
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
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

  const roomNumberRef = useRef<HTMLInputElement>(null);
  const departmentSelectRef = useRef<HTMLSelectElement>(null);

  const dispatch = useAppDispatch();

  const [addRoomFormDialogIsLoading, setAddRoomFormDialogIsLoading] =
    useState(false);

  const [doctors, setDoctors] = useState<string[]>([]);

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

    if (roomNumber && selectedDepartment && doctors) {
      try {
        const response = await axios.post(
          `${baseUrl}/room/create`,
          {
            department_id: selectedDepartment,
            doctor_id: doctors,
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

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: any[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any> | undefined,
  ) => {
    setDoctors(value.map((item) => item.id));
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
                  {allDepartmentsData.length > 0 ? (
                    allDepartmentsData?.map((e) => (
                      <MenuItem key={e.id} value={`${e.id}`}>
                        {e.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled key="1" value="1">
                      {t("Bo'lim turlari qo'shilmagan")}
                    </MenuItem>
                  )}
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
