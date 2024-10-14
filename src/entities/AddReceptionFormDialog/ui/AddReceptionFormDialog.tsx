/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useRef,
  useState,
  useContext,
  ChangeEvent,
  useEffect,
} from 'react';

import axios from 'axios';
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
  Dialog,
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Checkbox,
} from '@mui/material';

import { useSelector } from 'react-redux';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import cls from './AddReceptionFormDialog.module.scss';

import { baseUrl } from '../../../../baseurl';
import { Doctor, GetImage } from '@/shared/assets/Pages/Doctor';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Loader } from '@/widgets/Loader';
import { fetchAllRooms } from '@/pages/admin/AddRoomPage/model/services/fetchAllRooms';
import instance from '@/shared/lib/axios/api';

// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { getAllRoomsData } from '@/pages/admin/AddRoomPage/model/selector/allRoomSelector';
import { fetchAllReceptions } from '@/pages/admin/AddReceptionPage/model/service/fetchAllReceptions';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface Roomtype {
  name: string;
  id: string;
}

const AddReceptionFormDialog = () => {
  const { t } = useTranslation();

  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

  const [addReceptionFormDialogIsLoading, setAddReceptionFormDialogIsLoading] =
    useState(false);

  /* img input value */
  const inputProfileImgRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  /* F.I.Sh value */
  const FullNameInputRef = useRef<HTMLInputElement>(null);

  /* experienceInputRef value */
  const experienceInputRef = useRef<HTMLInputElement>(null);

  /* phone Number Doctor input value */
  const phoneInput = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState('+998');
  const [personId, setPersonId] = React.useState<string[]>([]);

  function handleInputChange(event: any, name: string) {
    setValue(event);
  }

  /* Password input value */
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const departmentSelectRef = useRef<HTMLSelectElement>(null);

  const dispatch = useAppDispatch();

  const {
    setHasOpenToast,
    isOpenAddReceptionCard,
    setIsOpenAddReceptionCard,
    setToastDataForAddRoomForm,
  } = useContext(ButtonsContext);

  const allRoomsData = useSelector(getAllRoomsData);

  useEffect(() => {
    dispatch(fetchAllRooms({}));
  }, [dispatch]);

  /* MUI halper */
  const [showPassword, setShowPassword] = useState(false);
  const [asosiyArr, setAsosiyArr] = useState<Roomtype[]>([
    { name: '', id: '' },
  ]);
  const [rooms, setRooms] = useState<string[]>([]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  /* MUI finished */

  const handleClose = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsOpenAddReceptionCard(false);
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

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: any[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any> | undefined,
  ) => {
    const newValue = value?.map((option) => option.name);

    setRooms(value.map((item) => item.id));

    if (!personId.includes(String(newValue[newValue.length - 1]))) {
      setPersonId(newValue);
    }
  };

  // eslint-disable-next-line consistent-return
  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setAddReceptionFormDialogIsLoading(true);

    const ImgProfile = selectedFile;
    const FullName = FullNameInputRef?.current?.value;
    const Experience = experienceInputRef?.current?.value;
    const PhoneNumber = value;

    const Password = inputPasswordRef?.current?.value;

    const dataForm = new FormData();

    if (
      PhoneNumber.startsWith('+998') &&
      PhoneNumber.length > 8 &&
      PhoneNumber.length >= 8
    ) {
      dataForm.append('role', `reception`);

      if (ImgProfile) {
        dataForm.append('file', ImgProfile);
      }

      dataForm.append('name', `${FullName}`);
      dataForm.append('exprience', `${Experience}`);
      dataForm.append(
        'login',
        `${PhoneNumber.split('+998')[1].replace(/\s/g, '')}`,
      );
      dataForm.append('password', `${Password}`);

      // @ts-ignore
      dataForm.append('rooms', rooms);
    }

    if (FullName && Experience && PhoneNumber && Password) {
      try {
        const response = await instance.post(`${baseUrl}/users`, dataForm);

        if (response.data) {
          setAddReceptionFormDialogIsLoading(false);

          setIsOpenAddReceptionCard(false);

          setHasOpenToast(true);

          setToastDataForAddRoomForm({
            toastMessageForAddRoomForm: t("Reception muvaffaqiyatli qo'shildi"),
            toastSeverityForAddRoomForm: 'success',
          });

          dispatch(fetchAllReceptions({}));
        }

        return response.data;
      } catch (error) {
        setAddReceptionFormDialogIsLoading(false);

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

  useEffect(() => {
    if (phoneInput.current) {
      phoneInput.current.focus();
    }
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

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={isOpenAddReceptionCard}
        className={cls.DepartmentAddWrapper}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={cls.DepartmentAddCard}
        >
          <p className={cls.CardTitle}>{t('Qabul qo‘shish')}</p>
          <form onSubmit={handleFormSubmit} className={cls.AddDoctorCard}>
            <div className={cls.AddCardImg}>
              <LazyLoadImage
                className={cls.AddCardImgValue}
                src={selectedFile ? URL.createObjectURL(selectedFile) : Doctor}
                alt="#"
              />

              <button
                type="button"
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
                    required={!(personId.length > 0)}
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
                inputRef={experienceInputRef}
                inputProps={{ min: 1, max: 50 }}
              />

              <label>
                {t('Telefon raqami')}
                <Input
                  required
                  autoFocus
                  value={value}
                  minLength={8}
                  name="PhoneNumber"
                  autoComplete="off"
                  inputRef={phoneInput}
                  rules={{ required: true }}
                  className={cls.InputPhoneNumber}
                  placeholder={t('Telefon raqami')}
                  onChange={(e) => handleInputChange(e, 'PhoneNumber')}
                />
              </label>
              {/* get Value Pasword Input started */}
              <FormControl
                sx={{ width: '100%', margin: '10px 0' }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  {t('Parolni kiriting')}
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
                  label={t('Parolni kiriting')}
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
      </Dialog>

      {addReceptionFormDialogIsLoading && <Loader />}
    </>
  );
};

export default AddReceptionFormDialog;
