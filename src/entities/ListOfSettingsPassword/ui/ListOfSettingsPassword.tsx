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

interface ListOfSettingsPasswordProps {
  className?: string;
}

const ListOfSettingsPassword = ({ className }: ListOfSettingsPasswordProps) => {
  const { t } = useTranslation();

  const { settingsFormData, setSettingsFormData, setHasOpenToast } =
    useContext(ButtonsContext);

  const [toastProps, setToastProps] = useState({
    message: '',
    severity: '',
  });

  const fetchChangePassword = async () => {
    const getTokenCookie = Cookies.get('token');

    try {
      const response = await axios.post(
        `${baseUrl}/users/updatePassword`,

        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${getTokenCookie}`,
          },

          data: JSON.stringify({
            password: settingsFormData.password,
            newPassword: settingsFormData.newPassword,
          }),
        },
      );

      if (String(response.status) === 'success') {
        setToastProps({
          message: t("Parol o'zgartirildi"),
          severity: 'success',
        });

        setHasOpenToast(true);

        console.log(response);
      } else if (String(response.status) === 'error') {
        setToastProps({
          message: t("Xatolik sodir bo'ldi"),
          severity: 'success',
        });

        setHasOpenToast(true);
      }
    } catch (error) {
      setToastProps({
        message: t("Xatolik sodir bo'ldi"),
        severity: 'success',
      });

      setHasOpenToast(true);

      console.error(error);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (settingsFormData.password !== settingsFormData.newPassword) {
      fetchChangePassword();
    } else {
      setToastProps({
        message: t("Yangi parol eskisi bilan bir xil bo'lmasligi kerak"),
        severity: 'error',
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

        <LoginSubmitBtn />
      </form>
      <Toast severity={toastProps.severity} message={toastProps.message} />
    </div>
  );
};

export default ListOfSettingsPassword;
