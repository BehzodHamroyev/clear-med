import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { LoginTitle } from '../../LoginTitle';
import { LoginKeyInput } from '../../LoginKeyInput';
import { LoginSubmitBtn } from '../../LoginSubmitBtn';
import { LoginPhoneNumber } from '../../LoginPhoneNumber';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './LoginFormLeft.module.scss';
import { store } from '@/shared/lib/context/LoginContext';

const LoginFormLeft = () => {
  const { t } = useTranslation();

  const { setIsSubmitLoginForm, isSubmitLoginForm, formData, setFormData } =
    useContext(ButtonsContext);

  const handleChange = (nameInput: string, e: any) => {
    setFormData({ ...formData, [nameInput]: e });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    store.login(`${Number(formData.PhoneNumber)}`, formData.UserPassword);

    setIsSubmitLoginForm(!isSubmitLoginForm);
  };

  return (
    <div className={cls.LoginFormLeftWrapper}>
      <LoginTitle />

      <form onSubmit={handleSubmit}>
        <LoginPhoneNumber handleChange={handleChange} />

        <LoginKeyInput handleChange={handleChange} />

        <LoginSubmitBtn content={t('Kirish')} />
      </form>
    </div>
  );
};

export default LoginFormLeft;
