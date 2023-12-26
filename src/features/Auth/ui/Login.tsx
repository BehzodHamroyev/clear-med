import React, { FC, useEffect } from 'react';

import { LoginFormLeft } from '@/shared/ui/Login/LoginFormLeft';
import { LoginFormRight } from '@/shared/ui/Login/LoginFormRight';

import cls from './Login.module.scss';
import { fetchAuthLogin } from '../model/service/AuthenticatorResponse';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

const Login: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuthLogin({ password: 'issiqsuv', login: '998906123222' }));
    console.log('vjdnvosid');
  }, [dispatch]);

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
