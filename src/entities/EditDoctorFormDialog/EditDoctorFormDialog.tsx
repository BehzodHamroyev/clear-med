import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import {
  Dialog,
  TextField,
  InputLabel,
  FormControl,
  Button,
  IconButton,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';

import Input from 'react-phone-number-input/input';
import { VisibilityOff, Visibility } from '@mui/icons-material';

import cls from './EditDoctorFormDialog.module.scss';

import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import { GetImage } from '@/shared/assets/Pages/Doctor';

import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';

import { baseUrl } from '../../../baseurl';
import {
  ApiResponseDoctorDataType,
  DoctorEditDataSchema,
} from './editDoctorFormDialogTypes';
import { fetchAllDoctors } from '../../pages/AddDoctorPage/model/service/fetchAllDoctors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '@/shared/lib/classNames/classNames';

interface EditDoctorFormDialogProps {
  doctorId: string;
}

const EditDoctorFormDialog = ({ doctorId }: EditDoctorFormDialogProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const {
    isOpenDoctorEditCard,
    setIsOpenDoctorEditCard,
    setHasOpenToast,
    setToastDataForAddRoomForm,
  } = useContext(ButtonsContext);

  const [doctorCurrentData, setDoctorCurrentData] =
    useState<DoctorEditDataSchema>();

  const [editDoctorFormDialogIsLoading, setEditDoctorFormDialogIsLoading] =
    useState(false);

  /* img input value */
  const inputProfileImgRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  /* MUI halper */
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  /* MUI finished */

  const token = Cookies.get('token');

  const fetchDoctorData = async () => {
    setDoctorCurrentData({
      isLoading: true,
      isError: false,
      data: undefined,
    });

    try {
      const response = await axios.get(`${baseUrl}/users/${doctorId}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.data) {
        const responceData: ApiResponseDoctorDataType['data'] =
          response?.data?.data;

        setDoctorCurrentData({
          isLoading: false,
          isError: false,
          data: {
            name: responceData?.name,
            login: `+998 ${responceData?.login}`,
            exprience: `${responceData?.exprience}`,
            photo: responceData?.photo,
            password: doctorCurrentData?.data?.password,
          },
        });
      }
    } catch (error) {
      setDoctorCurrentData({
        isLoading: false,
        isError: true,
        data: undefined,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    if (doctorId) {
      fetchDoctorData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ImgProfileFile */
  const handleImgProfileFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  const handleClickUploadImage = () => {
    if (inputProfileImgRef.current) {
      inputProfileImgRef.current.click();
    }
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDoctorCurrentData((prevData) => ({
      ...prevData,
      data: {
        name: event?.target?.value,
        login: doctorCurrentData?.data?.login,
        exprience: doctorCurrentData?.data?.exprience,
        photo: doctorCurrentData?.data?.photo,
        password: doctorCurrentData?.data?.password,
      },
    }));
  };

  const handleChangeExprience = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDoctorCurrentData((prevData) => ({
      ...prevData,
      data: {
        name: doctorCurrentData?.data?.name,
        login: doctorCurrentData?.data?.login,
        exprience: event?.target?.value,
        photo: doctorCurrentData?.data?.photo,
        password: doctorCurrentData?.data?.password,
      },
    }));
  };

  const handleChangeLogin = (value: any) => {
    setDoctorCurrentData((prevData) => ({
      ...prevData,
      data: {
        name: doctorCurrentData?.data?.name,
        login: value,
        exprience: doctorCurrentData?.data?.exprience,
        photo: doctorCurrentData?.data?.photo,
        password: doctorCurrentData?.data?.password,
      },
    }));
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDoctorCurrentData((prevData) => ({
      ...prevData,
      data: {
        name: doctorCurrentData?.data?.name,
        login: doctorCurrentData?.data?.login,
        exprience: doctorCurrentData?.data?.exprience,
        photo: doctorCurrentData?.data?.photo,
        password: event?.target?.value,
      },
    }));
  };

  // eslint-disable-next-line consistent-return
  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setEditDoctorFormDialogIsLoading(true);

    const FullName = doctorCurrentData?.data?.name;
    const Experience = doctorCurrentData?.data?.exprience;
    const PhoneNumber = doctorCurrentData?.data?.login;
    const Password = doctorCurrentData?.data?.password;

    const token = Cookies.get('token');

    const dataForm = new FormData();

    if (
      PhoneNumber &&
      PhoneNumber.startsWith('+998') &&
      PhoneNumber.length >= 8
    ) {
      if (selectedFile) {
        dataForm.append('file', selectedFile);
      }

      dataForm.append('name', `${FullName}`);
      dataForm.append('exprience', `${Experience}`);
      dataForm.append(
        'login',
        `${PhoneNumber.split('+998')[1].replace(/\s/g, '')}`,
      );

      if (Password) {
        dataForm.append('password', `${Password}`);
      }
    }

    if (FullName && Experience && PhoneNumber) {
      try {
        const response = await axios.patch(
          `${baseUrl}/users/${doctorId}`,
          dataForm,
          {
            maxBodyLength: Infinity,
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data) {
          setEditDoctorFormDialogIsLoading(false);

          setIsOpenDoctorEditCard(false);

          setHasOpenToast(true);

          setToastDataForAddRoomForm({
            toastMessageForAddRoomForm: t("Doktor ma'lumotlari yangilandi"),
            toastSeverityForAddRoomForm: 'success',
          });

          dispatch(fetchAllDoctors({}));
        }

        return response.data;
      } catch (error) {
        setEditDoctorFormDialogIsLoading(false);

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setToastDataForAddRoomForm({
              toastMessageForAddRoomForm: t(
                "Barcha maydonlar to'ldirilishi shart",
              ),
              toastSeverityForAddRoomForm: 'warning',
            });
            setHasOpenToast(true);
          }
          if (error.response?.status === 403) {
            setToastDataForAddRoomForm({
              toastMessageForAddRoomForm: t('Telefon raqami avval kiritilgan'),
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
    } else {
      setToastDataForAddRoomForm({
        toastMessageForAddRoomForm: t("Barcha maydonlar to'ldirilishi shart"),
        toastSeverityForAddRoomForm: 'warning',
      });
      setHasOpenToast(true);
    }
  };

  const handleClose = () => {
    setDoctorCurrentData({});

    setIsOpenDoctorEditCard(false);
  };

  return (
    <>
      {doctorCurrentData?.data && (
        <Dialog
          onClose={handleClose}
          open={isOpenDoctorEditCard}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classNames(cls.DoctorEditWrapper)}
        >
          <div className={cls.DoctorEditWrapperCard}>
            <div className={cls.EditDoctorCard}>
              <h3 className={cls.CardTitle}>{t('Shifokorni tahrirlash')}</h3>

              <form onSubmit={handleFormSubmit} className={cls.AddDoctorCard}>
                <div className={cls.AddCardImg}>
                  <img
                    className={cls.AddCardImgValue}
                    src={
                      selectedFile
                        ? URL.createObjectURL(selectedFile)
                        : `http://socketmed.magicsoft.uz/${doctorCurrentData.data.photo}`
                    }
                    alt="doctor"
                  />

                  <button
                    type="button"
                    onClick={handleClickUploadImage}
                    className={cls.AddCardImgValuebtn}
                  >
                    {}
                    <GetImage />
                  </button>

                  <input
                    id="input"
                    type="file"
                    ref={inputProfileImgRef}
                    style={{ display: 'none' }}
                    accept=".jpg, .jpeg, .png, .svg, .heic, .webp"
                    onChange={(e) => handleImgProfileFileChange(e)}
                  />
                </div>

                <div className={cls.CardBody}>
                  <TextField
                    required
                    type="text"
                    variant="outlined"
                    label={t('F.I.Sh')}
                    id="outlined-basic"
                    className={cls.InputBulim}
                    inputProps={{ min: 1, maxLength: 30 }}
                    value={doctorCurrentData?.data?.name}
                    onChange={handleChangeName}
                  />
                  <TextField
                    required
                    type="number"
                    variant="outlined"
                    id="outlined-basic"
                    label={t('Tajribasi')}
                    className={cls.InputBulim}
                    inputProps={{ min: 1, max: 50 }}
                    value={doctorCurrentData?.data?.exprience}
                    onChange={handleChangeExprience}
                  />
                  {t('Telefon raqami')}
                  <Input
                    required
                    autoFocus
                    minLength={8}
                    name="PhoneNumber"
                    autoComplete="off"
                    rules={{ required: true }}
                    className={cls.InputPhoneNumber}
                    placeholder={t('Telefon raqami')}
                    value={doctorCurrentData?.data?.login}
                    onChange={handleChangeLogin}
                  />
                  <FormControl
                    sx={{ width: '100%', margin: '10px 0' }}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      {t('Parolni kiriting')}
                    </InputLabel>

                    <OutlinedInput
                      inputProps={{ maxLength: 12, minLength: 8 }}
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      value={doctorCurrentData.data.password}
                      onChange={handleChangePassword}
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
                      label={t('Parolni kiriting')}
                    />
                  </FormControl>
                  <div className={cls.BtnParnet}>
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={handleClose}
                      className={`${cls.Btn} ${cls.Btn1}`}
                    >
                      {t('Bekor qilish')}
                    </Button>

                    <Button
                      className={`${cls.Btn} ${cls.Btn2}`}
                      type="submit"
                      variant="contained"
                    >
                      {t('Saqlash')}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Dialog>
      )}

      {(doctorCurrentData?.isLoading || editDoctorFormDialogIsLoading) && (
        <Loader />
      )}

      {doctorCurrentData?.isError && <ErrorDialog isErrorProps={!false} />}
    </>
  );
};

export default EditDoctorFormDialog;
