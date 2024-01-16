import React, { useContext } from 'react';

import { LoginTitle } from '../../LoginTitle';
import { LoginKeyInput } from '../../LoginKeyInput';
import { LoginSubmitBtn } from '../../LoginSubmitBtn';
import { LoginPhoneNumber } from '../../LoginPhoneNumber';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './LoginFormLeft.module.scss';

const LoginFormLeft = () => {
  const { setIsSubmitLoginForm, formData, setFormData } =
    useContext(ButtonsContext);

  const handleChange = (nameInput: string, e: any) => {
    setFormData({ ...formData, [nameInput]: e });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setIsSubmitLoginForm(true);
  };

  return (
    <div className={cls.LoginFormLeftWrapper}>
      <LoginTitle />

      <form onSubmit={handleSubmit}>
        <LoginPhoneNumber handleChange={handleChange} />

        <LoginKeyInput handleChange={handleChange} />

        <LoginSubmitBtn />
      </form>
    </div>
  );
};

export default LoginFormLeft;
