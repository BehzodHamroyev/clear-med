import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from 'react-phone-number-input/input';

import cls from './LoginPhoneNumber.module.scss';
import { FixIcon } from '@/shared/assets/Pages/LoginPage';

const LoginPhoneNumber = () => {
  const phoneInput = useRef<HTMLInputElement | null>(null);

  const { t } = useTranslation();
  const [value, setValue] = useState('+998');

  function handleInputChange(event: any, name: string) {
    setValue(event);
  }

  const handleInputFix = () => {
    setValue('');
  };

  useEffect(() => {
    if (phoneInput.current) {
      phoneInput.current.focus();
    }
  }, []);

  return (
    <div className={cls.LoginPhoneNumberWrapper}>
      <p className={cls.PhoneNumberStyle}>{t('Telefon raqami')}</p>
      <div className={cls.PhoneNumberInputWrapper}>
        <Input
          inputRef={phoneInput}
          className={cls.PhoneNumberInput}
          name="PhoneNumber"
          placeholder={t('Raqamingizni kiriting...')}
          rules={{ required: true }}
          value={value}
          minLength={8}
          autoComplete="off"
          autoFocus
          onChange={(e) => handleInputChange(e, 'PhoneNumber')}
        />
        <FixIcon onClick={handleInputFix} className={cls.FixValueBnt} />
      </div>
    </div>
  );
};

export default LoginPhoneNumber;
