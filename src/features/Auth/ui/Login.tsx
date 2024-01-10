import React, { FC, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  ReducersList,
  DynamicModuleLoader,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { AuthSliceReducer } from '../model/slice/AuthSlice';
import { getUserData } from '../model/selector/getUserData';
import { LoginFormLeft } from '@/shared/ui/Login/LoginFormLeft';
import { LoginFormRight } from '@/shared/ui/Login/LoginFormRight';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { fetchAuthLogin } from '../model/service/AuthenticatorResponse';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import cls from './Login.module.scss';

const reducer: ReducersList = {
  login: AuthSliceReducer,
};

const Login: FC = () => {
  const { isSubmitLoginForm, setIsSubmitLoginForm, setIsProfileWho, formData } =
    useContext(ButtonsContext);

  const dispatch = useAppDispatch();

  const loginData = useSelector(getUserData);

  useEffect(() => {
    if (loginData) {
      setIsProfileWho(`${loginData.role}`);
    } else {
      setIsProfileWho('');
    }
  }, [loginData, setIsProfileWho]);

  useEffect(() => {
    if (isSubmitLoginForm) {
      dispatch(
        fetchAuthLogin({
          password: formData.UserPassword,
          login: Number(formData.PhoneNumber),
          // password: '12345678' /* admin */,
          // login: 1 /* admin */,
          // password: '12345678',/* doctor */
          // login: 906518141,/* doctor */
        }),
      );

      setIsSubmitLoginForm(false);
    }
  }, [
    dispatch,
    isSubmitLoginForm,
    formData.PhoneNumber,
    setIsSubmitLoginForm,
    formData.UserPassword,
  ]);

  return (
    <DynamicModuleLoader reducers={reducer}>
      <div className={cls.LoginPageWrapper}>
        <div className={cls.LoginForm}>
          <LoginFormLeft />

          <LoginFormRight />
        </div>
      </div>
    </DynamicModuleLoader>
  );
};

export default Login;
