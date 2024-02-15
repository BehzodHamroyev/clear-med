import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import Input from 'react-phone-number-input/input';
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
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import cls from './EditMonitorFormDialog.module.scss';

import { Loader } from '@/widgets/Loader';
import { baseUrl } from '../../../../baseurl';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchGetAllMonitors } from '../../../pages/AddMonitorPage/model/service/fetchGetAllMonitors';

interface EditMonitorFormDialogTypes {}

interface Advertising {
  addvertising: boolean;
  createdAt: string;
  disabled: boolean;
  id: string;
  monitor: string;
  name: string;
  rooms: string[];
  updatedAt: string;
  videos: string[];
  __v: number;
  _id: string;
}

interface MoniterData {
  addvertising?: boolean;
  _id?: string;
  name?: string;
  photo?: string;
  role?: string;
  login?: number | string;
  password?: string;
  passwordChangedDate?: Date | null;
  experience?: number;
  monitors?: Advertising[];
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
    setIsMonitorAddSelectionFormAdvertisement,
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

        setMonitorCurrentData({
          isLoading: false,
          isError: false,
          data: {
            name: responceData.name,
            login: `+998 ${responceData.login}`,
            password: '',
            addvertising: responceData!?.monitors!?.[0].addvertising,
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
        password: monitorCurrentData?.data?.password,
        addvertising: monitorCurrentData?.data?.addvertising,
      },
    }));
  };

  const handleInputChangeFormPhoneNumber = (value: any) => {
    setMonitorCurrentData((prevData) => ({
      ...prevData,
      data: {
        name: monitorCurrentData?.data?.name,
        login: value,
        password: monitorCurrentData?.data?.password,
        addvertising: monitorCurrentData?.data?.addvertising,
      },
    }));

    setPhoneError(false);
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
        addvertising: monitorCurrentData?.data?.addvertising,
      },
    }));
  };

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value === '1') {
      setMonitorCurrentData((prevData) => ({
        ...prevData,
        data: {
          name: monitorCurrentData?.data?.name,
          login: monitorCurrentData?.data?.login,
          password: monitorCurrentData?.data?.password,
          addvertising: true,
        },
      }));
    } else {
      setMonitorCurrentData((prevData) => ({
        ...prevData,
        data: {
          name: monitorCurrentData?.data?.name,
          login: monitorCurrentData?.data?.login,
          password: monitorCurrentData?.data?.password,
          addvertising: false,
        },
      }));
    }
  };

  const handleSubmitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setEditMonitorFormDialogSubmitIsLoading(true);

    const Name = monitorCurrentData?.data?.name;
    const Login = `${monitorCurrentData?.data?.login}`;
    const Password = monitorCurrentData?.data?.password;
    const addvertisingValue = monitorCurrentData?.data?.addvertising;

    if (Name && Login && Login.startsWith('+998')) {
      try {
        const response = await axios.patch(
          `${baseUrl}/users/update/${monitorGetId}`,
          JSON.stringify({
            name: Name,
            login: `${Login.split('+998')[1].replace(/\s/g, '')}`,
            password: Password || null,
            addvertising: addvertisingValue,
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
                'Ushbu Telefon raqami avval ishlatilgan. Boshqa telefon raqami kiriting!',
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

              <Input
                required
                autoFocus
                maxLength={17}
                minLength={17}
                name="PhoneNumber"
                autoComplete="off"
                rules={{ required: true }}
                className={cls.InputPhone}
                placeholder={t('Telefon raqami')}
                pattern="+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}"
                value={`${monitorCurrentData?.data?.login}`}
                onChange={handleInputChangeFormPhoneNumber}
              />

              <FormControl
                variant="outlined"
                sx={{ width: '100%' }}
                className={cls.InputBulim}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  {t('Parolni yangilash')}
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
                  label={t('Parolni yangilash')}
                />
              </FormControl>

              <Box sx={{ minWidth: 120, marginBottom: '20px' }}>
                <FormControl required fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {t('Reklama turi')}
                  </InputLabel>

                  <Select
                    label="Reklama turi"
                    onChange={handleChange}
                    id="demo-simple-select"
                    value={`${
                      monitorCurrentData?.data?.addvertising &&
                      monitorCurrentData?.data?.addvertising === true
                        ? 1
                        : monitorCurrentData?.data?.addvertising === false
                        ? 2
                        : ''
                    }`}
                    labelId="demo-simple-select-label"
                  >
                    <MenuItem value="1">{t('Reklamali')}</MenuItem>
                    <MenuItem value="2">{t('Reklamasiz')}</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <div className={cls.BtnParnet}>
                <Button
                  variant="outlined"
                  type="button"
                  onClick={handleClose}
                  className={`${cls.Btn}`}
                >
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
