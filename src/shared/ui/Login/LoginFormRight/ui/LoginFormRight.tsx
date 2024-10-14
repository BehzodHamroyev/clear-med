import React from 'react';
import cls from './LoginFormRight.module.scss';
import { LoginFormRightIcon } from '@/shared/assets/Pages/LoginPage';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const LoginFormRight = () => {
  return (
    <div className={cls.LoginFormRightWrapper}>
      <LazyLoadImage className={cls.LoginFormRightImg} src={LoginFormRightIcon} alt="#" />
    </div>
  );
};

export default LoginFormRight;
