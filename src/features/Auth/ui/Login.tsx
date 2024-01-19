import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import cls from './Login.module.scss';

import { LoginFormLeft } from '@/shared/ui/Login/LoginFormLeft';
import { LoginFormRight } from '@/shared/ui/Login/LoginFormRight';
import { getAuthUserIsLoading } from '../model/selector/authUserSelector';
import { Loader } from '@/widgets/Loader';

const Login: FC = () => {
  // const { setIsProfileWho } = useContext(ButtonsContext);

  const authUserIsLoading = useSelector(getAuthUserIsLoading);

  // useEffect(() => {
  //   if (loginData) {
  //     setIsProfileWho(`${loginData.role}`);
  //   } else {
  //     setIsProfileWho('');
  //   }
  // }, [loginData, setIsProfileWho]);

  // eslint-disable-next-line react-hooks/exhaustive-deps

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
