import React from 'react';
import cls from './LoginFormRight.module.scss';
import { LoginFormRightIcon } from '@/shared/assets/Pages/LoginPage';

const LoginFormRight = () => {
  return (
    <div className={cls.LoginFormRightWrapper}>
      <img className={cls.LoginFormRightImg} src={LoginFormRightIcon} alt="#" />
    </div>
  );
};

export default LoginFormRight;
