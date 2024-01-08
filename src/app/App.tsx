import React, { memo, Suspense, useContext } from 'react';

import { useLocation } from 'react-router-dom';
import { Navbar } from '@/widgets/Nabar';
import { Loader } from '@/widgets/Loader';
import { AppRouter } from './providers/router';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { classNames } from '@/shared/lib/classNames/classNames';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import 'react-calendar/dist/Calendar.css';
// import { Login } from '@/features/Auth';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const App = memo(() => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const path = useLocation();
  const { isProfileWho } = useContext(ButtonsContext);

  const token = localStorage.getItem('token');

  // isProfileWho === '' ||

  return (
    <div id="app" className={classNames('app_redesigned', {}, [theme])}>
      {/* {!token || path.pathname === '/login' ? (
        <Login />
      ) : ( */}
        <Suspense fallback={<Loader />}>
          <MainLayout header={<Navbar />} content={<AppRouter />} />
        </Suspense>
      {/* // )} */}
    </div>
  );
});

export default withTheme(App);
