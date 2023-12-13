import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from 'react-phone-number-input/input';

import cls from './LoginPhoneNumber.module.scss';
import { FixIcon } from '@/shared/assets/Pages/LoginPage';

const LoginPhoneNumber = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  function handleInputChange(event: any) {
    setValue(event);
  }
  const handleInputFix = () => {
    setValue('');
  };

  return (
    <div className={cls.LoginPhoneNumberWrapper}>
      <p className={cls.PhoneNumberStyle}>{t('Telefon raqami')}</p>
      <div className={cls.PhoneNumberInputWrapper}>
        <Input
          placeholder={t('Raqamingizni kiriting...')}
          value={value}
          onChange={(e) => handleInputChange(e)}
          className={cls.PhoneNumberInput}
        />
        <FixIcon onClick={handleInputFix} className={cls.FixValueBnt} />
      </div>
    </div>
  );
};

export default LoginPhoneNumber;
