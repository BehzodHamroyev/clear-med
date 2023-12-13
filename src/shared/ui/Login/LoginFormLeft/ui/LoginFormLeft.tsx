import React from 'react';

import { LoginTitle } from '../../LoginTitle';
import { LoginKeyInput } from '../../LoginKeyInput';
import { LoginSubmitBtn } from '../../LoginSubmitBtn';
import { LoginPhoneNumber } from '../../LoginPhoneNumber';

import cls from './LoginFormLeft.module.scss';

const LoginFormLeft = () => {
  return (
    <div className={cls.LoginFormLeftWrapper}>
      <LoginTitle />

      <LoginPhoneNumber />

      <LoginKeyInput />

      <LoginSubmitBtn />
    </div>
  );
};

export default LoginFormLeft;
