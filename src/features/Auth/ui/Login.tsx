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

import cls from './Login.module.scss';

const reducer: ReducersList = {
  login: AuthSliceReducer,
};

const Login: FC = () => {
  const { setIsProfileWho } = useContext(ButtonsContext);

  const loginData = useSelector(getUserData);

  useEffect(() => {
    if (loginData) {
      setIsProfileWho(`${loginData.role}`);
    } else {
      setIsProfileWho('');
    }
  }, [loginData, setIsProfileWho]);

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
