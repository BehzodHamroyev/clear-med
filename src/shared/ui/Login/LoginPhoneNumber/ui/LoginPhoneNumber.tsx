import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from 'react-phone-number-input/input';

import cls from './LoginPhoneNumber.module.scss';
import { FixIcon } from '@/shared/assets/Pages/LoginPage';

interface LoginPhoneNumberProps {
  handleChange: any;
}

const LoginPhoneNumber = (props: LoginPhoneNumberProps) => {
  const phoneInput = useRef<HTMLInputElement | null>(null);

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

  useEffect(() => {
    if (phoneInput.current) {
      phoneInput.current.focus();
    }

    console.log(phoneInput.current);
  }, []);

  return (
    <div className={cls.LoginPhoneNumberWrapper}>
      <p className={cls.PhoneNumberStyle}>{t('Telefon raqami')}</p>
      <div className={cls.PhoneNumberInputWrapper}>
        <Input
          inputRef={phoneInput}
          name="PhoneNumber"
          placeholder={t('Raqamingizni kiriting...')}
          value={value}
          rules={{ required: true }}
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
