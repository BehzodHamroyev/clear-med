/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';
import { Dialog } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Input from 'react-phone-number-input/input';

import cls from './AddMonitorFormDialog.module.scss';

import { baseUrl } from '../../../../baseurl';
import { FormDataInState } from '../model/types/doctorAddTypes';
import { EyeIcon, HideIcon } from '@/shared/assets/Pages/LoginPage';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { MonitorAddSelection } from '@/entities/MonitorAddSelection';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchGetAllMonitors } from '../../../pages/AddMonitorPage/model/service/fetchGetAllMonitors';
import { Loader } from '@/widgets/Loader';

const AddMonitorFormDialog = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const phoneInput = useRef<HTMLInputElement | null>(null);

  const {
    setHasOpenToast,
    isOpenMonitorAddCard,
    setIsOpenMonitorAddCard,
    setToastDataForAddRoomForm,
    isMonitorAddSelectionFormAdvertisement,
  } = React.useContext(ButtonsContext);

  const [hideEye, setHideEye] = useState(false);

  const [phoneError, setPhoneError] = useState<boolean | null>(null);

  const [isAllFormData, setIsAllFormData] = React.useState<FormDataInState>({
    name: '',
    login: '',
    password: '',
    exprience: false,
  });

  const [
    addMonitorFormDialogSubmitIsLoading,
    setAddMonitorFormDialogSubmitIsLoading,
  ] = useState(false);

  const handleInputChangeFormName = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsAllFormData({ ...isAllFormData, name: e.target.value });
  };

  function handleInputChangeFormPhoneNumber(value: any) {
    if (value.length === 13) {
      const phoneNumber = value;
      const formattedValue = phoneNumber.replace('+998', '');

      setIsAllFormData({ ...isAllFormData, login: formattedValue });
      setPhoneError(false);
    } else {
      setIsAllFormData({ ...isAllFormData, login: value });
      setPhoneError(true);
    }
  }

  function handleInputChangeFormPassword(event: any, name: string) {
    setIsAllFormData({ ...isAllFormData, password: event });
  }

  const handleClose = () => {
    setIsOpenMonitorAddCard(false);
  };

  const token = Cookies.get('token');

  const handleSubmitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log(isAllFormData, String(isAllFormData.login).length);

    if (
      isAllFormData.name &&
      isAllFormData.login &&
      String(isAllFormData.login).length > 4 &&
      isAllFormData.password
    ) {
      setAddMonitorFormDialogSubmitIsLoading(true);

      try {
        const response = await axios.post(
          `${baseUrl}/monitor`,
          {
            name: isAllFormData.name,
            login: `${isAllFormData.login}`,
            password: `${isAllFormData.password}`,
            addvertising: isAllFormData.exprience,
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
          setIsOpenMonitorAddCard(false);

          setAddMonitorFormDialogSubmitIsLoading(false);

          setHasOpenToast(true);

          setToastDataForAddRoomForm({
            toastMessageForAddRoomForm: t("Monitor muvaffaqiyatli qo'shildi"),
            toastSeverityForAddRoomForm: 'success',
          });

          dispatch(fetchGetAllMonitors({}));
        }
      } catch (error) {
        setAddMonitorFormDialogSubmitIsLoading(false);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 403) {
            setToastDataForAddRoomForm({
              toastMessageForAddRoomForm: t(
                "Bu Login boshqa Monitorga biriktirilgan. Loginni o'zgartiring",
              ),
              toastSeverityForAddRoomForm: 'warning',
            });

            setHasOpenToast(true);
          }

          if (error.response?.status === 404) {
            setToastDataForAddRoomForm({
              toastMessageForAddRoomForm: t(
                "maydonlar to'liq to'ldirilganiga ishonch hosil qiling yoki qayta urining!",
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
    } else {
      setHasOpenToast(true);

      setToastDataForAddRoomForm({
        toastMessageForAddRoomForm: t("Maydonlarni qayta to'ldiring"),
        toastSeverityForAddRoomForm: 'warning',
      });
    }
  };

  useEffect(() => {
    setIsAllFormData({
      ...isAllFormData,
      exprience: isMonitorAddSelectionFormAdvertisement,
    });
  }, [isAllFormData, isMonitorAddSelectionFormAdvertisement]);

  return (
    <>
      {addMonitorFormDialogSubmitIsLoading && <Loader />}

      <Dialog
        open={isOpenMonitorAddCard}
        onClose={handleClose}
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
          <h3 className={cls.CardTitle}>{t("Monitor qo'shish")}</h3>

          <form onSubmit={handleSubmitForm} className={cls.CardBody}>
            <input
              required
              type="text"
              minLength={4}
              maxLength={30}
              placeholder={t('Nomi')}
              className={cls.InputBulim}
              value={`${isAllFormData.name}`}
              onChange={(e) => handleInputChangeFormName(e)}
            />

            <Input
              required
              autoFocus
              maxLength={17}
              minLength={17}
              name="PhoneNumber"
              autoComplete="off"
              inputRef={phoneInput}
              className={cls.InputBulim}
              // value={`${isAllFormData.login}`}
              placeholder={`${t('Login')} (+998 90 123 45 67)`}
              onChange={(e) => handleInputChangeFormPhoneNumber(e)}
            />

            <div className={cls.PhoneNumberInputWrapper}>
              <input
                required
                min={8}
                minLength={8}
                maxLength={14}
                id="UserPassword"
                autoComplete="off"
                name="UserPassword"
                placeholder={t('Parol')}
                className={cls.InputBulim}
                value={isAllFormData.password}
                type={hideEye ? 'text' : 'password'}
                onChange={(e) =>
                  handleInputChangeFormPassword(e.target.value, 'UserPassword')
                }
              />

              {hideEye ? (
                <EyeIcon
                  className={cls.FixValueBnt}
                  onClick={() => setHideEye(false)}
                />
              ) : (
                <HideIcon
                  className={cls.FixValueBnt}
                  onClick={() => setHideEye(true)}
                />
              )}
            </div>

            <MonitorAddSelection />

            <div className={cls.BtnParnet}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpenMonitorAddCard(false);
                }}
                type="button"
                className={`${cls.Btn} ${cls.Btn1}`}
              >
                {t('Bekor qilish')}
              </button>

              <button type="submit" className={`${cls.Btn} ${cls.Btn2}`}>
                {t('Saqlash')}
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default AddMonitorFormDialog;
