import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { VisibilityOff, Visibility } from '@mui/icons-material';

import {
  Button,
  Dialog,
  TextField,
  InputLabel,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';

import cls from './EditMonitorFormDialog.module.scss';

import { Loader } from '@/widgets/Loader';
import { baseUrl } from '../../../../baseurl';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchGetAllMonitors } from '../../../pages/AddMonitorPage/model/service/fetchGetAllMonitors';

interface EditMonitorFormDialogTypes {}

interface MoniterData {
  _id?: string;
  name?: string;
  photo?: string;
  role?: string;
  login?: number | string;
  password?: string;
  passwordChangedDate?: Date | null;
  experience?: number;
  __v?: number;
  id?: string;
}

interface MonitorEditDataSchema {
  isLoading?: boolean;
  isError?: boolean;
  data?: MoniterData;
}

const EditMonitorFormDialog = (props: EditMonitorFormDialogTypes) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const token = Cookies.get('token');

  const [monitorCurrentData, setMonitorCurrentData] =
    useState<MonitorEditDataSchema>();

  const [showPassword, setShowPassword] = React.useState(false);

  const [phoneError, setPhoneError] = useState<boolean | null>(null);

  const [
    editMonitorFormDialogSubmitIsLoading,
    setEditMonitorFormDialogSubmitIsLoading,
  ] = useState(false);

  const {
    monitorGetId,
    setHasOpenToast,
    isOpenMonitorEditCard,
    monitorEditFormOldValue,
    setIsOpenMonitorEditCard,
    setToastDataForAddRoomForm,
  } = useContext(ButtonsContext);

  const fetchMonitorData = async () => {
    setMonitorCurrentData({
      isLoading: true,
      isError: false,
      data: undefined,
    });

    try {
      const response = await axios.get(`${baseUrl}/users/${monitorGetId}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });

      if (response?.data) {
        const responceData: MoniterData = response?.data?.data;
        console.log(responceData);

        setMonitorCurrentData({
          isLoading: false,
          isError: false,
          data: {
            name: responceData.name,
            login: responceData.login,
            password: '',
          },
        });
      }
    } catch (error) {
      setMonitorCurrentData({
        isLoading: false,
        isError: true,
        data: undefined,
      });
      console.log(error);
    }
  };

  const handleInputChangeFormName = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMonitorCurrentData((prevData) => ({
      ...prevData,
      data: {
        name: event?.target?.value,
        login: monitorCurrentData?.data?.login,
      },
    }));
  };

  const handleInputChangeFormPhoneNumber = (event: any, name: string) => {
    if (event.target.value.length === 13) {
      const phoneNumber = event.target.value;
      const formattedValue = phoneNumber.replace('+998', '');

      setMonitorCurrentData((prevData) => ({
        ...prevData,
        data: {
          name: monitorCurrentData?.data?.name,
          login: formattedValue,
        },
      }));

      setPhoneError(false);
    } else {
      setMonitorCurrentData((prevData) => ({
        ...prevData,
        data: {
          name: monitorCurrentData?.data?.name,
          login: event.target.value,
        },
      }));

      setPhoneError(true);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handelePasswordInputChange = (e: { target: { value: string } }) => {
    setMonitorCurrentData((prevData) => ({
      ...prevData,
      data: {
        name: monitorCurrentData?.data?.name,
        login: monitorCurrentData?.data?.login,
        password: e?.target?.value,
      },
    }));
  };

  const handleSubmitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setEditMonitorFormDialogSubmitIsLoading(true);

    if (monitorCurrentData?.data?.name) {
      try {
        const response = await axios.patch(
          `${baseUrl}/users/update/${monitorGetId}`,
          JSON.stringify({
            name: monitorCurrentData.data.name,
            login: monitorCurrentData.data.login,
            password: monitorCurrentData.data.password
              ? monitorCurrentData?.data?.password
              : null,
          }),
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data) {
          setEditMonitorFormDialogSubmitIsLoading(false);

          setIsOpenMonitorEditCard(false);

          setHasOpenToast(true);

          setToastDataForAddRoomForm({
            toastMessageForAddRoomForm: t("Monitor ma'lumotlari yangilandi"),
            toastSeverityForAddRoomForm: 'success',
          });

          dispatch(fetchGetAllMonitors({}));
        }
      } catch (error) {
        setEditMonitorFormDialogSubmitIsLoading(false);

        if (axios.isAxiosError(error)) {
          if (error?.response?.status === 403) {
            setToastDataForAddRoomForm({
              toastMessageForAddRoomForm: t(
                "Qandaydir xatolik yuzaga keldi. Qayta urinib ko'ring!",
              ),
              toastSeverityForAddRoomForm: 'warning',
            });

            setHasOpenToast(true);
          }

          if (error.response?.status === 404) {
            setToastDataForAddRoomForm({
              toastMessageForAddRoomForm: t('xatolik yuzaga keldi'),
              toastSeverityForAddRoomForm: 'error',
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

  const handleClose = () => {
    setIsOpenMonitorEditCard(false);
  };

  useEffect(() => {
    if (monitorGetId && monitorGetId.length > 1) {
      fetchMonitorData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monitorGetId]);

  return (
    <div>
      {monitorGetId && monitorEditFormOldValue && (
        <Dialog
          onClose={handleClose}
          open={isOpenMonitorEditCard}
          className={cls.DepartmentAddWrapper}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className={cls.DepartmentAddCard}>
            <h3 className={cls.CardTitle}>{t('Monitorni tahrirlash')}</h3>

            <form onSubmit={handleSubmitForm} className={cls.CardBody}>
              <TextField
                required
                autoFocus
                type="text"
                label={t('Nomi')}
                variant="outlined"
                id="outlined-basic"
                className={cls.InputBulim}
                inputProps={{ maxLength: 30 }}
                onChange={handleInputChangeFormName}
                value={`${
                  monitorCurrentData?.data?.name
                    ? monitorCurrentData?.data?.name
                    : ''
                }`}
              />

              <TextField
                required
                autoFocus
                label={t('Login')}
                name="PhoneNumber"
                autoComplete="off"
                className={cls.InputBulim}
                inputProps={{
                  // minLength: 13,
                  maxLength: 13,
                  pattern: '+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}',
                }}
                style={
                  phoneError === true
                    ? { borderBottom: 'red' }
                    : phoneError === false
                    ? { borderBottom: 'green' }
                    : { borderBottom: 'black' }
                }
                placeholder={t('Login (+998 90 123 45 67)')}
                value={`${
                  monitorCurrentData?.data?.login
                    ? monitorCurrentData?.data?.login
                    : ''
                }`}
                onChange={(e) =>
                  handleInputChangeFormPhoneNumber(e, 'PhoneNumber')
                }
              />

              <FormControl
                variant="outlined"
                sx={{ width: '100%' }}
                className={cls.InputBulim}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Parolni yangilash
                </InputLabel>
                <OutlinedInput
                  inputProps={{ minLength: 8, maxLength: 13 }}
                  onChange={handelePasswordInputChange}
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Parolni yangilash"
                />
              </FormControl>

              {/* <MonitorAddSelection /> */}

              <div className={cls.BtnParnet}>
                <Button
                  variant="outlined"
                  type="button"
                  onClick={handleClose}
                  className={`${cls.Btn}`}
                  // onClick={handleDeleteCardMonitor}
                >
                  {/* {t("O'chirib tashlash")} */}
                  {t('Bekor qilish')}
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  className={`${cls.Btn}`}
                >
                  {t('Saqlash')}
                </Button>
              </div>
            </form>
          </div>
        </Dialog>
      )}

      {(monitorCurrentData?.isLoading ||
        editMonitorFormDialogSubmitIsLoading) && <Loader />}

      {monitorCurrentData?.isError && <ErrorDialog isErrorProps={!false} />}
    </div>
  );
};

export default EditMonitorFormDialog;

// const handleDeleteCardMonitor = async (
//   e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
// ) => {
//   e.stopPropagation();
//   setResponseData(`${Math.random() * 100 + 1}`);
//   setIsOpenMonitorEditCard(false);

//   try {
//     const response = await axios.delete<any>(
//       `${baseUrl}/users/${departmentGetId}`,
//       {
//         maxBodyLength: Infinity,
//         headers: {
//           'Content-Type': 'application/json',
//           authorization: `Bearer ${token}`,
//         },
//       },
//     );

//     // setResponseAddDoctorStatusCode(200);
//     // setIsOpenDepartmentEditCard(false);

//     return response.data;
//   } catch (e) {
//     // return setResponseAddDoctorStatusCode('404');
//     return console.log(e);
//   }
// };
