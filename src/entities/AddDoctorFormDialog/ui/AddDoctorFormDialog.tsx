import React, { ChangeEvent, useContext, useRef, useState } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import Input from 'react-phone-number-input/input';
import { VisibilityOff, Visibility } from '@mui/icons-material';

import {
  Button,
  TextField,
  IconButton,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';

import cls from './AddDoctorFormDialog.module.scss';

import { baseUrl } from '../../../../baseurl';
import { Doctor, GetImage } from '@/shared/assets/Pages/Doctor';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchAllDoctors } from '../../../pages/AddDoctorPage/model/service/fetchAllDoctors';

const AddDoctorFormDialog = () => {
  const { t } = useTranslation();

  /* img input value */
  const inputProfileImgRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  /* F.I.Sh value */
  const FullNameInputRef = useRef<HTMLInputElement>(null);

  /* experienceInputRef value */
  const experienceInputRef = useRef<HTMLInputElement>(null);

  /* phone Number Doctor input value */
  const [phoneNumberDoctor, setPhoneNumberDoctor] = useState('');

  /* Password input value */
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const {
    setHasOpenToast,
    setIsOpenDoctorAddCard,
    setToastDataForAddRoomForm,
  } = useContext(ButtonsContext);

  /* MUI halper */
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  /* MUI finished */

  const handleClose = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsOpenDoctorAddCard(false);
  };

  const handleClick = () => {
    if (inputProfileImgRef.current) {
      inputProfileImgRef.current.click();
    }
  };

  /* ImgProfileFile */
  const handleImgProfileFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  /* PhoneNumber event */
  function handleInputChange(event: any, name: string) {
    setPhoneNumberDoctor(event);
  }

  // eslint-disable-next-line consistent-return
  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const ImgProfile = selectedFile;
    const FullName = FullNameInputRef?.current?.value;
    const Experience = experienceInputRef?.current?.value;
    const PhoneNumber = phoneNumberDoctor;
    const Password = inputPasswordRef?.current?.value;

    const token = Cookies.get('token');

    const dataForm = new FormData();

    if (
      PhoneNumber.startsWith('+998') &&
      PhoneNumber.length > 8 &&
      PhoneNumber.length >= 8
    ) {
      dataForm.append('role', `doctor`);
      dataForm.append('file', ImgProfile);
      dataForm.append('name', `${FullName}`);
      dataForm.append('exprience', `${Experience}`);
      dataForm.append(
        'login',
        `${PhoneNumber.split('+998')[1].replace(/\s/g, '')}`,
      );
      dataForm.append('password', `${Password}`);
    }

    if (ImgProfile && FullName && Experience && PhoneNumber && Password) {
      try {
        const response = await axios.post(`${baseUrl}/users`, dataForm, {
          maxBodyLength: Infinity,
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setIsOpenDoctorAddCard(false);

          setHasOpenToast(true);

          setToastDataForAddRoomForm({
            toastMessageForAddRoomForm: t("Doktor muvaffaqiyatli qo'shildi"),
            toastSeverityForAddRoomForm: 'success',
          });

          dispatch(fetchAllDoctors({}));
        }

        return response.data;
      } catch (error) {
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
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenDoctorAddCard(false);
      }}
      className={cls.DepartmentAddWrapper}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <h3 className={cls.CardTitle}>{t('Shifokor qo‘shish')}</h3>

        <form onSubmit={handleFormSubmit} className={cls.AddDoctorCard}>
          <div className={cls.AddCardImg}>
            <img
              className={cls.AddCardImgValue}
              src={selectedFile ? URL.createObjectURL(selectedFile) : Doctor}
              alt="#"
            />

            <button
              type="submit"
              onClick={handleClick}
              className={cls.AddCardImgValuebtn}
            >
              <GetImage />
              {}
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
              inputRef={FullNameInputRef}
              inputProps={{ min: 1, maxLength: 30 }}
            />

            <TextField
              required
              type="number"
              variant="outlined"
              id="outlined-basic"
              label={t('Tajribasi')}
              className={cls.InputBulim}
              inputRef={experienceInputRef}
              inputProps={{ min: 1, max: 50 }}
            />

            <Input
              required
              maxLength={20}
              id="PhoneNumber"
              autoComplete="off"
              name="PhoneNumber"
              label={t('Phone Number')}
              value={phoneNumberDoctor}
              rules={{ required: true }}
              className={cls.InputPhoneNumber}
              placeholder={t('Telefon raqami')}
              onChange={(e) => handleInputChange(e, 'PhoneNumber')}
            />

            {/* get Value Pasword Input started */}
            <FormControl
              sx={{ width: '100%', margin: '10px 0' }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Parolni kiriting
              </InputLabel>
              <OutlinedInput
                required
                inputRef={inputPasswordRef}
                inputProps={{ maxLength: 12, minLength: 8 }}
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
                label="Parolni kiriting"
              />
            </FormControl>
            {/* get Value Pasword Input finished */}

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
  );
};

export default AddDoctorFormDialog;
