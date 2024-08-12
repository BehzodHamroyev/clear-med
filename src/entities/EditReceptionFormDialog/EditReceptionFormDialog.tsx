/* eslint-disable ulbi-tv-plugin/public-api-imports */
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

import { styled } from '@mui/material/styles';
import {
  Dialog,
  TextField,
  InputLabel,
  FormControl,
  Button,
  IconButton,
  OutlinedInput,
  InputAdornment,
  Autocomplete,
  Checkbox,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from '@mui/material';

import Input from 'react-phone-number-input/input';
import { VisibilityOff, Visibility } from '@mui/icons-material';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useSelector } from 'react-redux';
import cls from './EditReceptionFormDialog.module.scss';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import { GetImage } from '@/shared/assets/Pages/Doctor';

import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';

import { baseUrl } from '../../../baseurl';

import {
  ApiResponseDoctorDataType,
  DoctorEditDataSchema,
} from './editReceptionFormDialogTypes';
import { fetchAllReceptions } from '../../pages/AddReceptionPage/model/service/fetchAllReceptions';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import instance from '@/shared/lib/axios/api';
import { getAllRoomsData } from '@/pages/AddRoomPage/model/selector/allRoomSelector';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface EditReceptionFormDialogProps {
  receptionId: string;
}

interface Roomtype {
  name: string;
  id: string;
}

const EditReceptionFormDialog = ({
  receptionId,
}: EditReceptionFormDialogProps) => {
  const { t } = useTranslation();

  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

  const allRoomsData = useSelector(getAllRoomsData);

  const dispatch = useAppDispatch();

  const {
    isOpenEditReceptionCard,
    setIsOpenEditReceptionCard,
    setHasOpenToast,
    setToastDataForAddRoomForm,
  } = useContext(ButtonsContext);

  const [receptionCurrentData, setReceptionCurrentData] =
    useState<DoctorEditDataSchema>();

  const [
    editReceptionFormDialogIsLoading,
    setEditReceptionFormDialogIsLoading,
  ] = useState(false);

  const [asosiyArr, setAsosiyArr] = useState<Roomtype[]>([
    { name: '', id: '' },
  ]);
  const [rooms, setRooms] = useState<string[]>([]);

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

  const fetchReceptionData = async () => {
    setReceptionCurrentData({
      isLoading: true,
      isError: false,
      data: undefined,
    });

    try {
      const response = await axios.get(`${baseUrl}/users/${receptionId}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.data) {
        const responceData: ApiResponseDoctorDataType['data'] =
          response?.data?.data;

        setReceptionCurrentData({
          isLoading: false,
          isError: false,
          data: {
            name: responceData?.name,
            login: `+998 ${responceData?.login}`,
            exprience: `${responceData?.exprience}`,
            photo: responceData?.photo,
            password: receptionCurrentData?.data?.password,
          },
        });
      }
    } catch (error) {
      setReceptionCurrentData({
        isLoading: false,
        isError: true,
        data: undefined,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    if (receptionId) {
      fetchReceptionData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (allRoomsData) {
      const optionsArray = allRoomsData!.map((item: any) => ({
        name: item.name,
        id: item.id,
      }));
      setAsosiyArr(optionsArray);
    }
  }, [allRoomsData]);

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
    setReceptionCurrentData((prevData) => ({
      ...prevData,
      data: {
        name: event?.target?.value,
        login: receptionCurrentData?.data?.login,
        exprience: receptionCurrentData?.data?.exprience,
        photo: receptionCurrentData?.data?.photo,
        password: receptionCurrentData?.data?.password,
      },
    }));
  };

  const handleChangeExprience = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setReceptionCurrentData((prevData) => ({
      ...prevData,
      data: {
        name: receptionCurrentData?.data?.name,
        login: receptionCurrentData?.data?.login,
        exprience: event?.target?.value,
        photo: receptionCurrentData?.data?.photo,
        password: receptionCurrentData?.data?.password,
      },
    }));
  };

  const handleChangeLogin = (value: any) => {
    setReceptionCurrentData((prevData) => ({
      ...prevData,
      data: {
        name: receptionCurrentData?.data?.name,
        login: value,
        exprience: receptionCurrentData?.data?.exprience,
        photo: receptionCurrentData?.data?.photo,
        password: receptionCurrentData?.data?.password,
      },
    }));
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReceptionCurrentData((prevData) => ({
      ...prevData,
      data: {
        name: receptionCurrentData?.data?.name,
        login: receptionCurrentData?.data?.login,
        exprience: receptionCurrentData?.data?.exprience,
        photo: receptionCurrentData?.data?.photo,
        password: event?.target?.value,
      },
    }));
  };

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: any[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any> | undefined,
  ) => {
    const newValue = value?.map((option) => option.name);

    setRooms(value.map((item) => item.id));
  };

  // eslint-disable-next-line consistent-return
  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setEditReceptionFormDialogIsLoading(true);

    const FullName = receptionCurrentData?.data?.name;
    const Experience = receptionCurrentData?.data?.exprience;
    const PhoneNumber = receptionCurrentData?.data?.login;
    const Password = receptionCurrentData?.data?.password;

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
      // @ts-ignore
      dataForm.append('rooms', rooms);
      if (Password) {
        dataForm.append('password', `${Password}`);
      }
    }

    if (FullName && Experience && PhoneNumber) {
      try {
        const response = await instance.patch(
          `${baseUrl}/users/${receptionId}`,
          dataForm,
        );

        if (response.data) {
          setEditReceptionFormDialogIsLoading(false);

          setIsOpenEditReceptionCard(false);

          setHasOpenToast(true);

          setToastDataForAddRoomForm({
            toastMessageForAddRoomForm: t("Reception ma'lumotlari yangilandi"),
            toastSeverityForAddRoomForm: 'success',
          });

          dispatch(fetchAllReceptions({}));
        }

        return response.data;
      } catch (error) {
        setEditReceptionFormDialogIsLoading(false);

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
    setReceptionCurrentData({});

    setIsOpenEditReceptionCard(false);
  };

  return (
    <>
      {receptionCurrentData?.data && (
        <Dialog
          onClose={handleClose}
          open={isOpenEditReceptionCard}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classNames(cls.DepartmentAddWrapper)}
        >
          <div className={cls.DepartmentAddCard}>
            <h3 className={cls.CardTitle}>{t('Qabulni tahrirlash')}</h3>

            <form onSubmit={handleFormSubmit} className={cls.AddDoctorCard}>
              <div className={cls.AddCardImg}>
                <img
                  className={cls.AddCardImgValue}
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : `http://socketmed.magicsoft.uz//${receptionCurrentData.data.photo}`
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
                  value={receptionCurrentData?.data?.name}
                  onChange={handleChangeName}
                />

                <Autocomplete
                  multiple
                  options={asosiyArr}
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
                      {option.name} - xona
                    </li>
                  )}
                  style={{
                    width: '100%',
                    marginBottom: '20px',
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t('Xonalar')}
                      style={{ cursor: 'pointer' }}
                      placeholder={`${t('Xonani tanlang')}...`}
                      // required={!(personId.length > 0)}
                    />
                  )}
                />
                <TextField
                  required
                  type="number"
                  variant="outlined"
                  id="outlined-basic"
                  label={t('Tajribasi')}
                  className={cls.InputBulim}
                  inputProps={{ min: 1, max: 50 }}
                  value={receptionCurrentData?.data?.exprience}
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
                  value={receptionCurrentData?.data?.login}
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
                    value={receptionCurrentData.data.password}
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
        </Dialog>
      )}

      {(receptionCurrentData?.isLoading ||
        editReceptionFormDialogIsLoading) && <Loader />}

      {receptionCurrentData?.isError && <ErrorDialog isErrorProps={!false} />}
    </>
  );
};

export default EditReceptionFormDialog;
