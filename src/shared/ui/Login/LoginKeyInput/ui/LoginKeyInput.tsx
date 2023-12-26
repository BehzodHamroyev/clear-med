import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './LoginKeyInput.module.scss';
import { EyeIcon, HideIcon } from '@/shared/assets/Pages/LoginPage';

interface LoginKeyInputProps {
  handleChange: any;
}

const LoginKeyInput = (props: LoginKeyInputProps) => {
  const { handleChange } = props;

  const [hideEye, setHideEye] = useState(false);

  const { t } = useTranslation();

  function handleInputChange(event: any, name: string) {
    handleChange(name, event);
  }

  return (
    <div className={cls.LoginPhoneNumberWrapper}>
      <p className={cls.PhoneNumberStyle}>{t('Parol')}</p>
      <div className={cls.PhoneNumberInputWrapper}>
        <input
          name="UserPassword"
          placeholder="Parolni kiriting..."
          className={cls.PhoneNumberInput}
          type={hideEye ? 'text' : 'password'}
          autoComplete="off"
          maxLength={14}
          minLength={8}
          onChange={(e) => handleInputChange(e.target.value, 'UserPassword')}
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
