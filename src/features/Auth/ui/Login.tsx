import React, { FC, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { io } from 'socket.io-client';
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
  const { isSubmitLoginForm, setIsSubmitLoginForm, setIsProfileWho, formData } =
    useContext(ButtonsContext);

  const loginData = useSelector(getUserData);

  useEffect(() => {
    if (loginData) {
      // setIsProfileWho(`${loginData.role}`);
      setIsProfileWho(`admin`);
    } else {
      setIsProfileWho('');
    }
  }, [loginData, setIsProfileWho]);

  // const socket = io('ws://magicsoft.uz:8900/', {});

  // // @ts-ignore
  // socket.emit('create_queue', '659dea386b440c9b275fe237', (response) => {
  //   // console.log(response);
  //   // console.log('response');
  // });

  // socket.on('message', (data) => {
  //   // console.log('Received message:', data);
  // });

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
