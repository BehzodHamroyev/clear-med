import React, { memo, Suspense, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
import { observer } from 'mobx-react-lite';

import { Navbar } from '@/widgets/Nabar';
import { Loader } from '@/widgets/Loader';
import { AppRouter } from './providers/router';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { classNames } from '@/shared/lib/classNames/classNames';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';

import 'react-calendar/dist/Calendar.css';

// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { store } from '@/shared/lib/context/LoginContext';
import { Login } from '@/features/Auth';

const App = memo(() => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { isSubmitLoginForm, setIsSubmitLoginForm, formData } =
    useContext(ButtonsContext);

  useEffect(() => {
    if (isSubmitLoginForm) {
      store.login(`${Number(formData.PhoneNumber)}`, formData.UserPassword);
      setIsSubmitLoginForm(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitLoginForm]);

  // useEffect(() => {
  //   if (Cookies.get('token')) {
  //     store.checkAuth();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (!store.isAuth) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.isAuth]);

  useEffect(() => {
    console.log(store.isAuth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.isAuth]);

  if (store.isLoading) {
    return <Loader />;
  }

  // if (!store.isAuth) {
  //   return (
  //     <div>
  //       <Login />
  //     </div>
  //   );
  // }

  if (!Cookies.get('token')) {
    return (
      <div>
        <Login />
      </div>
    );
  }

  return (
    <div id="app" className={classNames('app_redesigned', {}, [theme])}>
      <Suspense fallback={<Loader />}>
        <MainLayout header={<Navbar />} content={<AppRouter />} />
      </Suspense>
    </div>
  );
});

export default observer(withTheme(App));
