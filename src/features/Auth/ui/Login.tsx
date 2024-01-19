import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import cls from './Login.module.scss';

import { LoginFormLeft } from '@/shared/ui/Login/LoginFormLeft';
import { LoginFormRight } from '@/shared/ui/Login/LoginFormRight';
import {
  getAuthUserData,
  getAuthUserIsLoading,
} from '../model/selector/authUserSelector';
import { Loader } from '@/widgets/Loader';

const Login: FC = () => {
  const authUserData = useSelector(getAuthUserData);

  const navigate = useNavigate();

  const authUserIsLoading = useSelector(getAuthUserIsLoading);

  useEffect(() => {
    if (authUserData?.role && Cookies.get('token')) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUserData]);

  return (
    <>
      <div className={cls.LoginPageWrapper}>
        <div className={cls.LoginForm}>
          <LoginFormLeft />

          <LoginFormRight />
        </div>
      </div>

      {authUserIsLoading && <Loader />}
    </>
  );
};

export default Login;
