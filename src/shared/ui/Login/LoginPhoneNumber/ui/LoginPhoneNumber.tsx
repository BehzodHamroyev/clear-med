import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from 'react-phone-number-input/input';

import cls from './LoginPhoneNumber.module.scss';
import { FixIcon } from '@/shared/assets/Pages/LoginPage';

interface LoginPhoneNumberProps {
  handleChange: any;
}

const LoginPhoneNumber = (props: LoginPhoneNumberProps) => {
  const { handleChange } = props;
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  function handleInputChange(event: any, name: string) {
    setValue(event);
    handleChange(name, event);
  }
  const handleInputFix = () => {
    setValue('');
  };

  return (
    <div className={cls.LoginPhoneNumberWrapper}>
      <p className={cls.PhoneNumberStyle}>{t('Telefon raqami')}</p>
      <div className={cls.PhoneNumberInputWrapper}>
        <Input
          name="PhoneNumber"
          placeholder={t('Raqamingizni kiriting...')}
          value={value}
          autoComplete="off"
          onChange={(e) => handleInputChange(e, 'PhoneNumber')}
          className={cls.PhoneNumberInput}
        />
        <FixIcon onClick={handleInputFix} className={cls.FixValueBnt} />
      </div>
    </div>
  );
};

export default LoginPhoneNumber;
