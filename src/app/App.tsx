import React, { memo, Suspense, useContext, useEffect, useState } from 'react';
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
import { Login } from '@/features/Auth';
import { store } from '@/shared/lib/context/LoginContext';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const App = memo(() => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { isSubmitLoginForm } = useContext(ButtonsContext);

  const [hasIsAuth, setHasIsAuth] = useState(store.isAuth);

  // useEffect(() => {
  //   console.log(hasIsAuth);

  //   setHasIsAuth(store.isAuth);

  //   if (!hasIsAuth) {
  //     navigate('/');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [store.isAuth]);

  useEffect(() => {
    setHasIsAuth(store.isAuth);
  }, [isSubmitLoginForm]);

  if (store.isLoading) {
    return <Loader />;
  }

  // if (!hasIsAuth) {
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
