import React, { Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

import { Navbar } from '@/widgets/Nabar';
import { Loader } from '@/widgets/Loader';
import { AppRouter } from './providers/router';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { classNames } from '@/shared/lib/classNames/classNames';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';

import 'react-calendar/dist/Calendar.css';

// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { Login, fetchAuthUser, getAuthUserData } from '@/features/Auth';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

const App = () => {
  const { theme } = useTheme();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const authUserData = useSelector(getAuthUserData);

  useEffect(() => {
    if (Cookies.get('token')) {
      dispatch(
        fetchAuthUser({
          refresh: true,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authUserData?.role && Cookies.get('token')) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUserData]);

  return (
    <div id="app" className={classNames('app_redesigned', {}, [theme])}>
      {!Cookies.get('token') ? (
        <Login />
      ) : (
        <Suspense fallback={<Loader />}>
          <MainLayout header={<Navbar />} content={<AppRouter />} />
        </Suspense>
      )}
    </div>
  );
};

export default withTheme(App);
