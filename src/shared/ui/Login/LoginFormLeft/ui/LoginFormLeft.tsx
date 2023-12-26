import React, { useContext, useState } from 'react';

import { LoginTitle } from '../../LoginTitle';
import { LoginKeyInput } from '../../LoginKeyInput';
import { LoginSubmitBtn } from '../../LoginSubmitBtn';
import { LoginPhoneNumber } from '../../LoginPhoneNumber';

import cls from './LoginFormLeft.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const LoginFormLeft = () => {
  const { setIsProfileWho } = useContext(ButtonsContext);

  const [formData, setFormData] = useState({
    PhoneNumber: '',
    UserPassword: '',
  });

  // console.log(formData, 'formData');

  const handleChange = (nameInput: string, e: any) => {
    setFormData({ ...formData, [nameInput]: e });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (
      formData.PhoneNumber === '+998977773767' &&
      formData.UserPassword === 'jafarbek'
    ) {
      setIsProfileWho('admin');
    } else if (
      formData.PhoneNumber === '+998901234567' &&
      formData.UserPassword === 'behzodbek'
    ) {
      setIsProfileWho('doktor');
    } else if (
      formData.PhoneNumber === '+998912345678' &&
      formData.UserPassword === 'abbosbek'
    ) {
      setIsProfileWho('qabulxona');
    }
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
