import React, { FC } from 'react';

import { LoginFormLeft } from '@/shared/ui/Login/LoginFormLeft';
import { LoginFormRight } from '@/shared/ui/Login/LoginFormRight';

import cls from './Login.module.scss';

const Login: FC = () => {
  return (
    <div className={cls.LoginPageWrapper}>
      <div className={cls.LoginForm}>
        <LoginFormLeft />

        <LoginFormRight />
      </div>
    </div>
  );
};

export default Login;
