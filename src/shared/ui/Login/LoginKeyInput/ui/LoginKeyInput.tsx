import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './LoginKeyInput.module.scss';
import { EyeIcon, HideIcon } from '@/shared/assets/Pages/LoginPage';

const LoginKeyInput = () => {
  const [hideEye, setHideEye] = useState(false);

  const { t } = useTranslation();

  return (
    <div className={cls.LoginPhoneNumberWrapper}>
      <p className={cls.PhoneNumberStyle}>{t('Parol')}</p>
      <div className={cls.PhoneNumberInputWrapper}>
        <input
          placeholder="Parolni kiriting..."
          className={cls.PhoneNumberInput}
          type={hideEye ? 'text' : 'password'}
          maxLength={14}
          minLength={8}
        />
        {hideEye ? (
          <EyeIcon
            onClick={() => setHideEye(false)}
            className={cls.FixValueBnt}
          />
        ) : (
          <HideIcon
            onClick={() => setHideEye(true)}
            className={cls.FixValueBnt}
          />
        )}
      </div>
    </div>
  );
};

export default LoginKeyInput;
