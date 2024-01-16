import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Cookies from 'js-cookie';

import cls from './ListOfSettingsPassword.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

import { baseUrl } from '../../../../baseurl';
import { LoginSubmitBtn } from '@/shared/ui/Login/LoginSubmitBtn';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import Toast from '@/shared/ui/Toast/Toast';
import { Loader } from '@/widgets/Loader';

interface ListOfSettingsPasswordProps {
  className?: string;
}

const ListOfSettingsPassword = ({ className }: ListOfSettingsPasswordProps) => {
  const { t } = useTranslation();

  const {
    settingsFormData,
    setSettingsFormData,
    setHasOpenToast,
    hasOpenToast,
  } = useContext(ButtonsContext);

  const [toastProps, setToastProps] = useState({
    message: '',
    severity: '',
  });

  const [settingLoad, setSettingLoad] = useState(false);

  const fetchChangePassword = async () => {
    setSettingLoad(true);

    const getTokenCookie = Cookies.get('token');

    try {
      const response = await axios.post(
        `${baseUrl}/users/updatePassword`,
        {
          password: settingsFormData.password,
          newPassword: settingsFormData.newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getTokenCookie}`,
          },
        },
      );

      if (String(response.data.status) === 'success') {
        setSettingLoad(false);

        Cookies.set('token', response.data.token);

        setToastProps({
          message: t("Parol o'zgartirildi"),
          severity: 'success',
        });

        setHasOpenToast(true);
      } else if (String(response.status) === 'error') {
        setSettingLoad(false);

        setToastProps({
          message: t("Xatolik sodir bo'ldi"),
          severity: 'error',
        });

        setHasOpenToast(true);
      }
    } catch (error) {
      setSettingLoad(false);

      setToastProps({
        message: t("Xatolik sodir bo'ldi"),
        severity: 'error',
      });

      setHasOpenToast(true);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (settingsFormData.password !== settingsFormData.newPassword) {
      fetchChangePassword();
    } else {
      setToastProps({
        message: t("Yangi parol eskisi bilan bir xil bo'lmasligi kerak"),
        severity: 'warning',
      });
      setHasOpenToast(true);
    }
  };

  return (
    <div className={classNames(cls.ListOfSettingsPassword, {}, [])}>
      {t("Parolni o'zgartirish")}
      <form
        className={classNames(cls.ListOfSettingsPassword__form, {}, [])}
        onSubmit={handleSubmit}
      >
        <div className={cls.LoginPhoneNumberWrapper}>
          <p className={cls.PhoneNumberStyle}>{t('Eski parolni kiriting')}</p>
          <div className={cls.PhoneNumberInputWrapper}>
            <input
              name="password"
              placeholder="Eski parolni kiriting..."
              className={cls.PhoneNumberInput}
              type="text"
              autoComplete="off"
              maxLength={14}
              minLength={8}
              required
              onChange={(e) =>
                setSettingsFormData({
                  password: e.target.value,
                  newPassword: settingsFormData.newPassword,
                })
              }
            />
          </div>
        </div>

        <div className={cls.LoginPhoneNumberWrapper}>
          <p className={cls.PhoneNumberStyle}>{t('Yangi parolni kiriting')}</p>
          <div className={cls.PhoneNumberInputWrapper}>
            <input
              name="newPassword"
              placeholder="Yangi parolni kiriting..."
              className={cls.PhoneNumberInput}
              type="text"
              autoComplete="off"
              maxLength={14}
              minLength={8}
              required
              onChange={(e) =>
                setSettingsFormData({
                  password: settingsFormData.password,
                  newPassword: e.target.value,
                })
              }
            />
          </div>
        </div>

        <LoginSubmitBtn content={t("O'zgartirish")} />
      </form>
      <Toast severity={toastProps.severity} message={toastProps.message} />

      {settingLoad && <Loader />}
    </div>
  );
};

export default ListOfSettingsPassword;
